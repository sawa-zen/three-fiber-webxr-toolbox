import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'
import { Portal, useConsole } from 'three-fiber-webxr-toolbox'
import { SkySphere } from './SkySphere'
import { useFrame } from '@react-three/fiber'

export function App() {
  const { pushMessage } = useConsole()
  const [counter, setCounter] = useState(0)
  const rotation = counter * 0.01

  useFrame(() => {
    setCounter((prev) => prev + 1)
    pushMessage(`counter: ${counter}`)
  })

  return (
    <>
      <Portal position={[0, 0.6, -0.5]} />
      <OrbitControls />
      <axesHelper args={[5]} />
      <gridHelper />
      <ambientLight />
      <directionalLight position={[1, 2, 3]} />
      <mesh
        position={[0, 1, -2]}
        rotation={[rotation, rotation, rotation]}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshPhongMaterial color="red" />
      </mesh>
      <SkySphere />
    </>
  )
}
