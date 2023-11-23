import { useCallback, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface Props {
  position: [number, number, number]
}

export const Box = (props: Props) => {
  const ref = useRef<Mesh | null>(null)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta
    }
  })

  const handleClick = useCallback(() => {
    click(!clicked)
  }, [clicked])

  const handlePointerOver = useCallback(() => {
    hover(true)
  }, [])

  const handlePointerOut = useCallback(() => {
    hover(false)
  }, [])

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={hovered ? 'hotpink' : 'red'}
      />
    </mesh>
  )
}
