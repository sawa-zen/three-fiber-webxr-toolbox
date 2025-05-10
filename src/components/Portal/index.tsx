interface Props {
  position?: [number, number, number]
  size?: [number, number, number]
}

export const Portal = ({
  position = [0, 0, 0],
  size = [1, 1, 1],
}: Props) => {
  return (
    <mesh renderOrder={-1} position={position}>
      <boxGeometry args={size} />
      <meshBasicMaterial colorWrite={false} />
    </mesh>
  )
}
