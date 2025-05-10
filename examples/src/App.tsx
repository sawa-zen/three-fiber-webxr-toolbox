import { useCallback, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { SkySphere } from './SkySphere'
import { useConsole } from 'three-fiber-webxr-toolbox'

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
      <gridHelper />
      <ambientLight />
      <directionalLight position={[1, 2, 3]} />
      <mesh
        position={[0, 0.9, -0.4]}
        scale={[0.1, 0.1, 0.1]}
        rotation={[rotation, rotation, rotation]}
        onClick={handleClickBox}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshPhongMaterial color="skyblue" />
      </mesh>
      <SkySphere />
    </>
  )
}
