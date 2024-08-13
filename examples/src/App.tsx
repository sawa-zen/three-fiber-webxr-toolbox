import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'
import { SkySphere } from './SkySphere'
import { useXRPlanes, XRPlaneModel, XRSpace } from '@react-three/xr'
import { useFrame } from '@react-three/fiber'

export function App() {
  const [rotation, setRotation] = useState(0)

  useFrame(() => {
    setRotation((r) => r + 0.01)
  })

  return (
    <>
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
