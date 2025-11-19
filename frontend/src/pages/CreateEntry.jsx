import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import MoodSelector from '../components/MoodSelector'
import Scene3D from '../three/Scene3D'

const CreateEntry = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: '',
    tags: []
  })
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleMoodSelect = (mood) => {
    setFormData({
      ...formData,
      mood
    })
  }

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()]
        })
      }
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.title.trim() || !formData.content.trim() || !formData.mood) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      await axios.post('/api/entries', formData, {
        withCredentials: true
      })
      navigate('/dashboard')
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create entry')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gradient mb-2">Create New Entry</h1>
          <p className="text-gray-600">Express your thoughts and track your mood</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8"
            >
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="input-field w-full"
                    placeholder="What's on your mind?"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows={8}
                    className="input-field w-full resize-none"
                    placeholder="Write your thoughts, feelings, or experiences..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    How are you feeling? *
                  </label>
                  <MoodSelector
                    selectedMood={formData.mood}
                    onMoodSelect={handleMoodSelect}
                  />
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (optional)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="input-field w-full"
                    placeholder="Add tags and press Enter"
                  />
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.tags.map((tag, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-calm-blue/20 text-calm-blue px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-red-500 transition-colors"
                          >
                            ×
                          </button>
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Saving...
                      </div>
                    ) : (
                      'Save Entry'
                    )}
                  </motion.button>
                  
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="btn-secondary px-8"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* 3D Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold text-deep-navy mb-4">Mood Preview</h3>
              <div className="h-48">
                <Scene3D 
                  mood={formData.mood || 'CALM'} 
                  intensity={5}
                  showFloatingElements={false}
                />
              </div>
              {formData.mood && (
                <p className="text-center text-sm text-gray-600 mt-2 capitalize">
                  {formData.mood.toLowerCase()}
                </p>
              )}
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold text-deep-navy mb-4">Writing Tips</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="text-calm-blue">•</span>
                  <span>Be honest about your feelings</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-calm-blue">•</span>
                  <span>Include specific details about your day</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-calm-blue">•</span>
                  <span>Reflect on what triggered your mood</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-calm-blue">•</span>
                  <span>Use tags to categorize your entries</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEntry