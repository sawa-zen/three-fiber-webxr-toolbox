export const MegaBeam = () => {
  return (
    <group>
      <mesh>
        <coneGeometry args={[1, 0.5, 10]}  />
        <meshPhongMaterial />
      </mesh>
    </group>
  )
}