/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'calm-blue': '#A4C2F4',
        'soft-purple': '#CDB4FF',
        'mint-green': '#C1F2D5',
        'warm-yellow': '#FFE680',
        'deep-navy': '#1A1F3A',
        'glass-white': 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(0, 0, 0, 0.1)'
      },
      backgroundImage: {
        'mood-gradient': 'linear-gradient(135deg, #A4C2F4 0%, #CDB4FF 50%, #C1F2D5 100%)',
        'calm-gradient': 'linear-gradient(135deg, #A4C2F4 0%, #E8F4FD 100%)',
        'creative-gradient': 'linear-gradient(135deg, #CDB4FF 0%, #F0E6FF 100%)',
        'positive-gradient': 'linear-gradient(135deg, #C1F2D5 0%, #E8F8ED 100%)',
        'optimistic-gradient': 'linear-gradient(135deg, #FFE680 0%, #FFF4CC 100%)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(164, 194, 244, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(164, 194, 244, 0.8)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
}