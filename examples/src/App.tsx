import { useCallback, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { SkySphere } from './SkySphere'
import { Portal, useConsole } from 'three-fiber-webxr-toolbox'

export function App() {
  const [rotation, setRotation] = useState(0)
  const { pushMessage } = useConsole()

  useFrame(() => {
    setRotation((r) => r + 0.01)
  })

  const handleClickBox = useCallback(() => {
    pushMessage('Box clicked!')
  }, [pushMessage])

  return (
    <>
      <Portal
        position={[0, 1.3, -0.55]}
        size={[0.7, 0.05, 0.2]}
      />
      <gridHelper />
      <ambientLight />
      <directionalLight position={[1, 2, 3]} />
      <mesh
        position={[0, 1.5, -0.4]}
        scale={[0.1, 0.1, 0.1]}
        rotation={[rotation, rotation, rotation]}
        onClick={handleClickBox}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshPhongMaterial color="skyblue" />
      </mesh>
      <mesh
        position={[0.2, 1.5, -0.4]}
        scale={[0.1, 0.1, 0.1]}
        rotation={[rotation, rotation, rotation]}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshPhongMaterial color="blue" />
      </mesh>
      <SkySphere />
    </>
  )
}
