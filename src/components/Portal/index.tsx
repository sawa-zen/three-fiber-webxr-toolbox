interface Props {
  position?: [number, number, number]
}

export const Portal = ({
  position = [0, 0, 0]
}: Props) => {
  return (
    <mesh renderOrder={-1} position={position}>
      <boxGeometry args={[1, 0.1, 0.5]} />
      <meshBasicMaterial colorWrite={false} />
    </mesh>
  )
}
