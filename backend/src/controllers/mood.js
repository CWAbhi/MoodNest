import { body, validationResult } from 'express-validator'
import prisma from '../utils/db.js'

export const moodValidation = [
  body('type').isIn(['HAPPY', 'CALM', 'TIRED', 'ANXIOUS', 'FOCUSED', 'SAD', 'EXCITED', 'STRESSED', 'PEACEFUL', 'ENERGETIC']),
  body('intensity').isInt({ min: 1, max: 10 }),
  body('note').optional().isLength({ max: 500 }).trim()
]

export const getMoods = async (req, res) => {
  try {
    const { limit = 50, days = 30 } = req.query
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(days))

    const moods = await prisma.mood.findMany({
      where: {
        userId: req.user.id,
        createdAt: {
          gte: startDate
        }
      },
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' }
    })

    res.json({ moods })
  } catch (error) {
    console.error('Get moods error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const logMood = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const { type, intensity, note } = req.body

    const mood = await prisma.mood.create({
      data: {
        type,
        intensity,
        note,
        userId: req.user.id
      }
    })

    res.status(201).json({
      message: 'Mood logged successfully',
      mood
    })
  } catch (error) {
    console.error('Log mood error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getMoodSummary = async (req, res) => {
  try {
    const { days = 30 } = req.query
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(days))

    // Get mood distribution
    const moodDistribution = await prisma.mood.groupBy({
      by: ['type'],
      where: {
        userId: req.user.id,
        createdAt: {
          gte: startDate
        }
      },
      _count: {
        type: true
      },
      _avg: {
        intensity: true
      }
    })

    // Get daily mood trends
    const dailyMoods = await prisma.mood.findMany({
      where: {
        userId: req.user.id,
        createdAt: {
          gte: startDate
        }
      },
      orderBy: { createdAt: 'asc' },
      select: {
        type: true,
        intensity: true,
        createdAt: true
      }
    })

    // Group by date
    const dailyTrends = dailyMoods.reduce((acc, mood) => {
      const date = mood.createdAt.toISOString().split('T')[0]
      if (!acc[date]) {
        acc[date] = {
          date,
          moods: [],
          averageIntensity: 0,
          count: 0
        }
      }
      acc[date].moods.push(mood.type)
      acc[date].count++
      acc[date].averageIntensity = (acc[date].averageIntensity * (acc[date].count - 1) + mood.intensity) / acc[date].count
      return acc
    }, {})

    // Get most frequent mood
    const mostFrequentMood = moodDistribution.reduce((prev, current) => 
      (prev._count.type > current._count.type) ? prev : current
    , { type: 'CALM', _count: { type: 0 } })

    // Calculate average intensity
    const totalMoods = await prisma.mood.count({
      where: {
        userId: req.user.id,
        createdAt: {
          gte: startDate
        }
      }
    })

    const averageIntensity = await prisma.mood.aggregate({
      where: {
        userId: req.user.id,
        createdAt: {
          gte: startDate
        }
      },
      _avg: {
        intensity: true
      }
    })

    res.json({
      summary: {
        totalMoods,
        averageIntensity: averageIntensity._avg.intensity || 0,
        mostFrequentMood: mostFrequentMood.type,
        period: `${days} days`
      },
      distribution: moodDistribution.map(item => ({
        mood: item.type,
        count: item._count.type,
        averageIntensity: item._avg.intensity
      })),
      dailyTrends: Object.values(dailyTrends)
    })
  } catch (error) {
    console.error('Get mood summary error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}