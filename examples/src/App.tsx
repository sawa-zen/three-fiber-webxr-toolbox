import { OrbitControls, Wireframe } from '@react-three/drei'
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
      <RemoteDisplay position={[0, 1.5, -1]} />
      <Portal position={[0, 0.3, -1]} />
      <OrbitControls />
      <gridHelper />
      <ambientLight />
      <directionalLight position={[1, 2, 3]} />
      <mesh
        position={[2, 1, -2]}
        rotation={[rotation, rotation, rotation]}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshPhongMaterial color="red" />
      </mesh>
      <SkySphere />
    </>
  )
}
