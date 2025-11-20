import { body, validationResult } from 'express-validator'
import prisma from '../utils/db.js'

export const entryValidation = [
  body('title').isLength({ min: 1, max: 200 }).trim(),
  body('content').isLength({ min: 1 }).trim(),
  body('mood').isIn(['HAPPY', 'CALM', 'TIRED', 'ANXIOUS', 'FOCUSED', 'SAD', 'EXCITED', 'STRESSED', 'PEACEFUL', 'ENERGETIC']),
  body('tags').optional().isArray()
]

export const getEntries = async (req, res) => {
  try {
    const { page = 1, limit = 15, search, mood, sortBy = 'createdAt', sortOrder = 'desc' } = req.query
    const skip = (parseInt(page) - 1) * parseInt(limit)

    const where = {
      userId: req.user.id,
      ...(search && {
        OR: [
          { title: { contains: search } },
          { content: { contains: search } },
          { tags: { contains: search } }
        ]
      }),
      ...(mood && { mood })
    }

    const [rawEntries, total] = await Promise.all([
      prisma.entry.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { [sortBy]: sortOrder },
        select: {
          id: true,
          title: true,
          content: true,
          mood: true,
          tags: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.entry.count({ where })
    ])

    const entries = rawEntries.map(entry => ({
      ...entry,
      tags: entry.tags ? JSON.parse(entry.tags) : []
    }))

    res.json({
      entries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (error) {
    console.error('Get entries error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getEntry = async (req, res) => {
  try {
    const { id } = req.params

    const rawEntry = await prisma.entry.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    })

    if (!rawEntry) {
      return res.status(404).json({ message: 'Entry not found' })
    }

    const entry = {
      ...rawEntry,
      tags: rawEntry.tags ? JSON.parse(rawEntry.tags) : []
    }

    res.json({ entry })
  } catch (error) {
    console.error('Get entry error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const createEntry = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const { title, content, mood, tags = [] } = req.body

    const entry = await prisma.entry.create({
      data: {
        title,
        content,
        mood,
        tags: JSON.stringify(tags),
        userId: req.user.id
      }
    })

    res.status(201).json({
      message: 'Entry created successfully',
      entry
    })
  } catch (error) {
    console.error('Create entry error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateEntry = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const { id } = req.params
    const { title, content, mood, tags } = req.body

    // Check if entry exists and belongs to user
    const existingEntry = await prisma.entry.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    })

    if (!existingEntry) {
      return res.status(404).json({ message: 'Entry not found' })
    }

    const rawEntry = await prisma.entry.update({
      where: { id },
      data: {
        title,
        content,
        mood,
        tags: JSON.stringify(tags || [])
      }
    })

    const entry = {
      ...rawEntry,
      tags: rawEntry.tags ? JSON.parse(rawEntry.tags) : []
    }

    res.json({
      message: 'Entry updated successfully',
      entry
    })
  } catch (error) {
    console.error('Update entry error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params

    // Check if entry exists and belongs to user
    const existingEntry = await prisma.entry.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    })

    if (!existingEntry) {
      return res.status(404).json({ message: 'Entry not found' })
    }

    await prisma.entry.delete({
      where: { id }
    })

    res.json({ message: 'Entry deleted successfully' })
  } catch (error) {
    console.error('Delete entry error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}