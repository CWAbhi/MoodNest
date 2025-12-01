import { createContext, useContext, useState } from 'react'
import api from '../utils/api'

const MoodContext = createContext()

export const useMood = () => {
  const context = useContext(MoodContext)
  if (!context) {
    throw new Error('useMood must be used within a MoodProvider')
  }
  return context
}

export const MoodProvider = ({ children }) => {
  const [moods, setMoods] = useState([])
  const [loading, setLoading] = useState(false)

  const moodTypes = [
    { type: 'HAPPY', color: '#FFE680', emoji: '😊' },
    { type: 'CALM', color: '#A4C2F4', emoji: '😌' },
    { type: 'TIRED', color: '#E8E8E8', emoji: '😴' },
    { type: 'ANXIOUS', color: '#FFB3B3', emoji: '😰' },
    { type: 'FOCUSED', color: '#C1F2D5', emoji: '🎯' },
    { type: 'SAD', color: '#B3D9FF', emoji: '😢' },
    { type: 'EXCITED', color: '#FFCC99', emoji: '🤩' },
    { type: 'STRESSED', color: '#FFD1DC', emoji: '😤' },
    { type: 'PEACEFUL', color: '#E6F3FF', emoji: '☮️' },
    { type: 'ENERGETIC', color: '#FFEB99', emoji: '⚡' }
  ]

  const getMoodColor = (moodType) => {
    const mood = moodTypes.find(m => m.type === moodType)
    return mood ? mood.color : '#A4C2F4'
  }

  const getMoodEmoji = (moodType) => {
    const mood = moodTypes.find(m => m.type === moodType)
    return mood ? mood.emoji : '😊'
  }

  const logMood = async (moodData) => {
    try {
      setLoading(true)
      const response = await api.post('/mood', moodData)
      setMoods(prev => [response.data.mood, ...prev])
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to log mood' 
      }
    } finally {
      setLoading(false)
    }
  }

  const getMoods = async () => {
    try {
      setLoading(true)
      const response = await api.get('/mood')
      setMoods(response.data.moods)
    } catch (error) {
      console.error('Failed to fetch moods:', error)
    } finally {
      setLoading(false)
    }
  }

  const getMoodSummary = async () => {
    try {
      const response = await api.get('/mood/summary')
      return response.data
    } catch (error) {
      console.error('Failed to fetch mood summary:', error)
      return null
    }
  }

  const value = {
    moods,
    moodTypes,
    loading,
    getMoodColor,
    getMoodEmoji,
    logMood,
    getMoods,
    getMoodSummary
  }

  return (
    <MoodContext.Provider value={value}>
      {children}
    </MoodContext.Provider>
  )
}