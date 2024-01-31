import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'
import { SkySphere } from './SkySphere'
import { useFrame } from '@react-three/fiber'
import { Controllers } from '@react-three/xr'
import { PassthroughHands } from '../../src/components/PassthruHands'

export function App() {
  const [rotation, setRotation] = useState(0)

  useFrame(() => {
    setRotation((r) => r + 0.01)
  })

  return (
    <>
      <Controllers />
      <PassthroughHands />
      <OrbitControls />
      <gridHelper />
      <ambientLight />
      <directionalLight position={[1, 2, 3]} />
      <mesh
        position={[0, 0.9, -0.4]}
        scale={[0.1, 0.1, 0.1]}
        rotation={[rotation, rotation, rotation]}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshPhongMaterial color="skyblue" />
      </mesh>
      <SkySphere />
    </>
  )
}
