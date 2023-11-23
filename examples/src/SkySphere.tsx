import { BackSide } from "three"

export const SkySphere = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[10, 10, 10]}/>
      <meshPhongMaterial
        color="gray"
        side={BackSide}
      />
    </mesh>
  )
}
