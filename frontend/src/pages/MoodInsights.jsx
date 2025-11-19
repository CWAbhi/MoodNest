import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useMood } from '../context/MoodContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'
import { format, subDays } from 'date-fns'

const MoodInsights = () => {
  const { getMoodColor, getMoodEmoji } = useMood()
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState(30)

  useEffect(() => {
    fetchMoodSummary()
  }, [timeRange])

  const fetchMoodSummary = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/mood/summary?days=${timeRange}`, {
        withCredentials: true
      })
      setSummary(response.data)
    } catch (error) {
      console.error('Failed to fetch mood summary:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-calm-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading insights...</p>
        </div>
      </div>
    )
  }

  if (!summary || summary.summary.totalMoods === 0) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gradient mb-4">Mood Insights</h1>
            <div className="glass-card p-12">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-2xl font-bold text-deep-navy mb-4">No Data Yet</h2>
              <p className="text-gray-600 mb-6">
                Start logging your moods to see beautiful insights and trends!
              </p>
              <button
                onClick={() => window.history.back()}
                className="btn-primary"
              >
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  const pieData = summary.distribution.map(item => ({
    name: item.mood,
    value: item.count,
    color: getMoodColor(item.mood)
  }))

  const lineData = summary.dailyTrends.map(day => ({
    date: format(new Date(day.date), 'MMM dd'),
    intensity: Math.round(day.averageIntensity * 10) / 10,
    count: day.count
  }))

  const barData = summary.distribution.map(item => ({
    mood: item.mood.toLowerCase(),
    count: item.count,
    avgIntensity: Math.round(item.averageIntensity * 10) / 10,
    fill: getMoodColor(item.mood)
  }))

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-2">Mood Insights</h1>
              <p className="text-gray-600">Discover patterns in your emotional journey</p>
            </div>
            <div className="flex gap-2">
              {[7, 30, 90].map(days => (
                <button
                  key={days}
                  onClick={() => setTimeRange(days)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    timeRange === days 
                      ? 'bg-calm-blue text-white' 
                      : 'glass-card hover:bg-white/30'
                  }`}
                >
                  {days} days
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 text-center"
          >
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-deep-navy">
              {summary.summary.totalMoods}
            </div>
            <div className="text-sm text-gray-600">Total Moods</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 text-center"
          >
            <div className="text-3xl mb-2">
              {getMoodEmoji(summary.summary.mostFrequentMood)}
            </div>
            <div className="text-lg font-bold text-deep-navy capitalize">
              {summary.summary.mostFrequentMood.toLowerCase()}
            </div>
            <div className="text-sm text-gray-600">Most Frequent</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 text-center"
          >
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-deep-navy">
              {Math.round(summary.summary.averageIntensity * 10) / 10}/10
            </div>
            <div className="text-sm text-gray-600">Avg Intensity</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 text-center"
          >
            <div className="text-3xl mb-2">📅</div>
            <div className="text-2xl font-bold text-deep-navy">
              {summary.summary.period}
            </div>
            <div className="text-sm text-gray-600">Time Period</div>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Mood Distribution Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold text-deep-navy mb-4">Mood Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name.toLowerCase()} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Daily Intensity Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold text-deep-navy mb-4">Daily Intensity Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis domain={[0, 10]} stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="intensity" 
                  stroke="#A4C2F4" 
                  strokeWidth={3}
                  dot={{ fill: '#A4C2F4', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#A4C2F4', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Mood Frequency Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-deep-navy mb-4">Mood Frequency & Average Intensity</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mood" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => [
                  value, 
                  name === 'count' ? 'Frequency' : 'Avg Intensity'
                ]}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Detailed Mood Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-bold text-deep-navy mb-6">Detailed Breakdown</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {summary.distribution.map((mood, index) => (
              <motion.div
                key={mood.mood}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 rounded-lg border"
                style={{ 
                  backgroundColor: `${getMoodColor(mood.mood)}10`,
                  borderColor: `${getMoodColor(mood.mood)}30`
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{getMoodEmoji(mood.mood)}</span>
                  <div>
                    <div className="font-semibold capitalize text-deep-navy">
                      {mood.mood.toLowerCase()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {mood.count} times logged
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frequency:</span>
                    <span className="font-medium">
                      {Math.round((mood.count / summary.summary.totalMoods) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Intensity:</span>
                    <span className="font-medium">
                      {Math.round(mood.averageIntensity * 10) / 10}/10
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MoodInsights