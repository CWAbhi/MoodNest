import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useMood } from '../context/MoodContext'
import Scene3D from '../three/Scene3D'
import MoodSelector from '../components/MoodSelector'
import { format } from 'date-fns'

const Dashboard = () => {
  const { user } = useAuth()
  const { logMood, getMoodEmoji, getMoodColor } = useMood()
  const [entries, setEntries] = useState([])
  const [recentMoods, setRecentMoods] = useState([])
  const [selectedMood, setSelectedMood] = useState('')
  const [moodIntensity, setMoodIntensity] = useState(5)
  const [moodNote, setMoodNote] = useState('')
  const [loading, setLoading] = useState(true)
  const [showMoodLogger, setShowMoodLogger] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [entriesRes, moodsRes] = await Promise.all([
        axios.get('/api/entries?limit=5', { withCredentials: true }),
        axios.get('/api/mood?limit=5', { withCredentials: true })
      ])
      
      setEntries(entriesRes.data.entries)
      setRecentMoods(moodsRes.data.moods)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMoodLog = async () => {
    if (!selectedMood) return

    const result = await logMood({
      type: selectedMood,
      intensity: moodIntensity,
      note: moodNote
    })

    if (result.success) {
      setShowMoodLogger(false)
      setSelectedMood('')
      setMoodNote('')
      setMoodIntensity(5)
      fetchDashboardData()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-calm-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gradient mb-2">
            Welcome back, {user?.firstName || user?.username}!
          </h1>
          <p className="text-gray-600">How are you feeling today?</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Mood Log */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-deep-navy">Quick Mood Check</h2>
                <button
                  onClick={() => setShowMoodLogger(!showMoodLogger)}
                  className="btn-primary"
                >
                  {showMoodLogger ? 'Cancel' : 'Log Mood'}
                </button>
              </div>

              {showMoodLogger && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <MoodSelector
                    selectedMood={selectedMood}
                    onMoodSelect={setSelectedMood}
                  />
                  
                  {selectedMood && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Intensity (1-10)
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={moodIntensity}
                          onChange={(e) => setMoodIntensity(parseInt(e.target.value))}
                          className="w-full"
                        />
                        <div className="text-center text-sm text-gray-600 mt-1">
                          {moodIntensity}/10
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Note (optional)
                        </label>
                        <textarea
                          value={moodNote}
                          onChange={(e) => setMoodNote(e.target.value)}
                          placeholder="How are you feeling right now?"
                          className="input-field w-full h-20 resize-none"
                        />
                      </div>
                      
                      <button
                        onClick={handleMoodLog}
                        className="btn-primary w-full"
                      >
                        Log Mood
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Recent Entries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-deep-navy">Recent Entries</h2>
                <Link to="/create" className="btn-primary">
                  New Entry
                </Link>
              </div>

              {entries.length > 0 ? (
                <div className="space-y-4">
                  {entries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card p-4 hover:bg-white/30 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">
                              {getMoodEmoji(entry.mood)}
                            </span>
                            <h3 className="font-semibold text-deep-navy">
                              {entry.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 text-sm overflow-hidden mb-2" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
                            {entry.content}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{format(new Date(entry.createdAt), 'MMM dd, yyyy')}</span>
                            <span className="capitalize">{entry.mood.toLowerCase()}</span>
                          </div>
                        </div>
                        <Link
                          to={`/entry/${entry.id}`}
                          className="text-calm-blue hover:text-soft-purple text-sm font-medium"
                        >
                          Read More
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No entries yet. Start your journey!</p>
                  <Link to="/create" className="btn-primary">
                    Write Your First Entry
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* 3D Mood Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold text-deep-navy mb-4">Your Mood</h3>
              <div className="h-48">
                <Scene3D 
                  mood={recentMoods[0]?.type || 'CALM'} 
                  intensity={recentMoods[0]?.intensity || 5}
                  showFloatingElements={false}
                />
              </div>
            </motion.div>

            {/* Recent Moods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-deep-navy">Recent Moods</h3>
                <Link to="/insights" className="text-calm-blue hover:text-soft-purple text-sm font-medium">
                  View All
                </Link>
              </div>

              {recentMoods.length > 0 ? (
                <div className="space-y-3">
                  {recentMoods.map((mood, index) => (
                    <motion.div
                      key={mood.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: `${getMoodColor(mood.type)}20` }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getMoodEmoji(mood.type)}</span>
                        <div>
                          <div className="font-medium capitalize text-sm">
                            {mood.type.toLowerCase()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {format(new Date(mood.createdAt), 'MMM dd, HH:mm')}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        {mood.intensity}/10
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-sm text-center py-4">
                  No mood logs yet
                </p>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold text-deep-navy mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/create" className="btn-secondary w-full text-left">
                  ✍️ Write New Entry
                </Link>
                <Link to="/insights" className="btn-secondary w-full text-left">
                  📊 View Insights
                </Link>
                <Link to="/profile" className="btn-secondary w-full text-left">
                  👤 Edit Profile
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard