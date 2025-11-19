import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Torus } from '@react-three/drei'
import * as THREE from 'three'

const FloatingElement = ({ position, geometry, color, speed = 1 }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed
      meshRef.current.rotation.y += 0.005 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
    }
  })

  const GeometryComponent = {
    box: Box,
    sphere: Sphere,
    torus: Torus
  }[geometry]

  const getArgs = () => {
    switch (geometry) {
      case 'box': return [0.5, 0.5, 0.5]
      case 'sphere': return [0.3, 16, 16]
      case 'torus': return [0.3, 0.1, 8, 16]
      default: return [0.3, 16, 16]
    }
  }

  return (
    <GeometryComponent ref={meshRef} args={getArgs()} position={position}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        roughness={0.2}
        metalness={0.1}
      />
    </GeometryComponent>
  )
}

const FloatingElements = () => {
  const elements = [
    { position: [-3, 2, -2], geometry: 'sphere', color: '#A4C2F4', speed: 0.8 },
    { position: [3, -1, -1], geometry: 'box', color: '#CDB4FF', speed: 1.2 },
    { position: [-2, -2, -3], geometry: 'torus', color: '#C1F2D5', speed: 0.6 },
    { position: [2, 3, -2], geometry: 'sphere', color: '#FFE680', speed: 1.0 },
    { position: [0, -3, -4], geometry: 'box', color: '#A4C2F4', speed: 0.9 }
  ]

  return (
    <>
      {elements.map((element, index) => (
        <FloatingElement key={index} {...element} />
      ))}
    </>
  )
}

export default FloatingElements