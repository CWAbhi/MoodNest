import { motion } from 'framer-motion'
import { useMood } from '../context/MoodContext'

const MoodSelector = ({ selectedMood, onMoodSelect, className = '' }) => {
  const { moodTypes, getMoodColor, getMoodEmoji } = useMood()

  return (
    <div className={`grid grid-cols-2 md:grid-cols-5 gap-3 ${className}`}>
      {moodTypes.map((mood, index) => (
        <motion.button
          key={mood.type}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onMoodSelect(mood.type)}
          className={`mood-card text-center p-4 ${
            selectedMood === mood.type 
              ? 'ring-2 ring-calm-blue bg-white/40' 
              : ''
          }`}
          style={{
            background: selectedMood === mood.type 
              ? `linear-gradient(135deg, ${getMoodColor(mood.type)}20, ${getMoodColor(mood.type)}10)`
              : undefined
          }}
        >
          <div className="text-3xl mb-2">{getMoodEmoji(mood.type)}</div>
          <div className="text-sm font-medium capitalize">
            {mood.type.toLowerCase()}
          </div>
        </motion.button>
      ))}
    </div>
  )
}

export default MoodSelector