import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import MoodOrb from './MoodOrb'
import FloatingElements from './FloatingElements'

const Scene3D = ({ mood = 'CALM', intensity = 5, showFloatingElements = true, className = '' }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#CDB4FF" />
        
        <Suspense fallback={null}>
          <MoodOrb mood={mood} intensity={intensity} />
          {showFloatingElements && <FloatingElements />}
          <Environment preset="sunset" />
        </Suspense>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

export default Scene3D