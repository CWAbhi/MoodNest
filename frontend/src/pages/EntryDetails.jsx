import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../utils/api'
import { useMood } from '../context/MoodContext'
import Scene3D from '../three/Scene3D'
import { format } from 'date-fns'

const EntryDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getMoodEmoji, getMoodColor } = useMood()
  const [entry, setEntry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})

  useEffect(() => {
    fetchEntry()
  }, [id])

  const fetchEntry = async () => {
    try {
      const response = await api.get(`/entries/${id}`)
      setEntry(response.data.entry)
      setEditData(response.data.entry)
    } catch (error) {
      setError('Entry not found')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await api.delete(`/entries/${id}`)
        navigate('/dashboard')
      } catch (error) {
        setError('Failed to delete entry')
      }
    }
  }

  const handleUpdate = async () => {
    try {
      const response = await api.put(`/entries/${id}`, editData)
      setEntry(response.data.entry)
      setIsEditing(false)
    } catch (error) {
      setError('Failed to update entry')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-calm-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading entry...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/dashboard" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <Link 
                to="/dashboard" 
                className="text-calm-blue hover:text-soft-purple mb-2 inline-block"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-4xl font-bold text-gradient">Journal Entry</h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-secondary"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8"
            >
              {isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({...editData, title: e.target.value})}
                      className="input-field w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content
                    </label>
                    <textarea
                      value={editData.content}
                      onChange={(e) => setEditData({...editData, content: e.target.value})}
                      rows={12}
                      className="input-field w-full resize-none"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <button onClick={handleUpdate} className="btn-primary">
                      Save Changes
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)} 
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Entry Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{getMoodEmoji(entry.mood)}</span>
                    <div>
                      <h2 className="text-3xl font-bold text-deep-navy mb-1">
                        {entry.title}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{format(new Date(entry.createdAt), 'MMMM dd, yyyy')}</span>
                        <span>{format(new Date(entry.createdAt), 'h:mm a')}</span>
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-medium capitalize"
                          style={{ 
                            backgroundColor: `${getMoodColor(entry.mood)}30`,
                            color: getMoodColor(entry.mood)
                          }}
                        >
                          {entry.mood.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Entry Content */}
                  <div className="prose prose-lg max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {entry.content}
                    </div>
                  </div>

                  {/* Tags */}
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-calm-blue/20 text-calm-blue px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Entry Stats */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Created:</span> {format(new Date(entry.createdAt), 'PPpp')}
                      </div>
                      {entry.updatedAt !== entry.createdAt && (
                        <div>
                          <span className="font-medium">Updated:</span> {format(new Date(entry.updatedAt), 'PPpp')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* 3D Mood Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold text-deep-navy mb-4">Mood Visualization</h3>
              <div className="h-48">
                <Scene3D 
                  mood={entry.mood} 
                  intensity={7}
                  showFloatingElements={false}
                />
              </div>
              <div className="text-center mt-4">
                <div className="text-2xl mb-2">{getMoodEmoji(entry.mood)}</div>
                <div className="text-sm font-medium capitalize text-gray-700">
                  {entry.mood.toLowerCase()}
                </div>
              </div>
            </motion.div>

            {/* Entry Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold text-deep-navy mb-4">Actions</h3>
              <div className="space-y-3">
                <Link to="/create" className="btn-secondary w-full text-left">
                  ✍️ Write New Entry
                </Link>
                <Link to="/dashboard" className="btn-secondary w-full text-left">
                  📊 View Dashboard
                </Link>
                <Link to="/insights" className="btn-secondary w-full text-left">
                  📈 Mood Insights
                </Link>
              </div>
            </motion.div>

            {/* Mood Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold text-deep-navy mb-4">About This Mood</h3>
              <div className="text-sm text-gray-600 space-y-2">
                {entry.mood === 'HAPPY' && (
                  <p>Happiness is associated with positive emotions, joy, and contentment. It often reflects satisfaction with life events.</p>
                )}
                {entry.mood === 'CALM' && (
                  <p>Calmness represents peace, tranquility, and emotional balance. It's a state of mental clarity and relaxation.</p>
                )}
                {entry.mood === 'ANXIOUS' && (
                  <p>Anxiety involves worry, nervousness, or unease about future events. It's a natural response to stress.</p>
                )}
                {entry.mood === 'FOCUSED' && (
                  <p>Focus represents concentration, determination, and mental clarity towards specific goals or tasks.</p>
                )}
                {/* Add more mood descriptions as needed */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntryDetails