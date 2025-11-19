import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const MoodOrb = ({ mood = 'CALM', intensity = 5 }) => {
  const meshRef = useRef()

  const getMoodColor = (moodType) => {
    const colors = {
      HAPPY: '#FFE680',
      CALM: '#A4C2F4',
      TIRED: '#E8E8E8',
      ANXIOUS: '#FFB3B3',
      FOCUSED: '#C1F2D5',
      SAD: '#B3D9FF',
      EXCITED: '#FFCC99',
      STRESSED: '#FFD1DC',
      PEACEFUL: '#E6F3FF',
      ENERGETIC: '#FFEB99'
    }
    return colors[moodType] || '#A4C2F4'
  }

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color={getMoodColor(mood)}
        attach="material"
        distort={0.3 + (intensity / 10) * 0.2}
        speed={2}
        roughness={0.1}
        metalness={0.1}
        transparent
        opacity={0.8}
      />
    </Sphere>
  )
}

export default MoodOrb