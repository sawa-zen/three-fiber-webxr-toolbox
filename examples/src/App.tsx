import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'
import { Portal, RemoteDisplay, useConsole } from 'three-fiber-webxr-toolbox'
import { SkySphere } from './SkySphere'
import { useFrame } from '@react-three/fiber'

export function App() {
  const [rotation, setRotation] = useState(0)

  useFrame(() => {
    setRotation((r) => r + 0.01)
  })

  return (
    <>
      <Portal position={[0, 0.3, -0.6]} />
      <OrbitControls />
      <axesHelper args={[5]} />
      <gridHelper />
      <ambientLight />
      <directionalLight position={[1, 2, 3]} />
      <mesh
        position={[2, 1, -2]}
        rotation={[rotation, rotation, rotation]}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshPhongMaterial color="skyblue" />
      </mesh>
      <SkySphere />
    </>
  )
}
