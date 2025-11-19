import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Scene3D from '../three/Scene3D'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Scene3D mood="CALM" intensity={3} />
        </div>
        
        {/* Floating Orbs */}
        <div className="absolute inset-0 z-10">
          <div className="floating-orb w-20 h-20 bg-calm-blue/30 top-20 left-20" />
          <div className="floating-orb w-16 h-16 bg-soft-purple/30 top-40 right-32" />
          <div className="floating-orb w-12 h-12 bg-mint-green/30 bottom-32 left-40" />
          <div className="floating-orb w-24 h-24 bg-warm-yellow/20 bottom-20 right-20" />
        </div>

        {/* Content */}
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold text-gradient mb-6"
          >
            MoodNest
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            Your digital sanctuary for journaling, mood tracking, and self-reflection. 
            Discover patterns, embrace growth, and nurture your mental wellness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {user ? (
              <Link to="/dashboard" className="btn-primary text-lg px-8 py-4">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn-primary text-lg px-8 py-4">
                  Start Your Journey
                </Link>
                <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                  Welcome Back
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center text-gradient mb-16"
          >
            Why Choose MoodNest?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Mood Tracking',
                description: 'Track your emotions with beautiful visualizations and gain insights into your mental patterns.',
                icon: '🎭',
                gradient: 'from-calm-blue to-soft-purple'
              },
              {
                title: 'Digital Journaling',
                description: 'Express your thoughts in a secure, private space designed for reflection and growth.',
                icon: '📝',
                gradient: 'from-soft-purple to-mint-green'
              },
              {
                title: 'Analytics & Insights',
                description: 'Understand your emotional journey with detailed analytics and personalized insights.',
                icon: '📊',
                gradient: 'from-mint-green to-warm-yellow'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-card p-8 text-center hover:shadow-glow transition-all duration-300"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-deep-navy">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-calm-blue/10 via-soft-purple/10 to-mint-green/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gradient mb-8"
          >
            Ready to Begin Your Journey?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-700 mb-8"
          >
            Join thousands of users who have transformed their mental wellness with MoodNest.
          </motion.p>

          {!user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/signup" className="btn-primary text-lg px-8 py-4">
                Get Started Free
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home