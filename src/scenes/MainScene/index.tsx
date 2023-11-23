import { useTeleportation } from "@react-three/xr"
import { useEffect, useRef } from "react"
import { DirectionalLight, SpotLightHelper } from "three"
import { OrbitControls, useHelper } from "@react-three/drei"

export const MainScene = () => {
  const teleport = useTeleportation()
  const dirLight = useRef<DirectionalLight | null>(null);
  useHelper(dirLight, SpotLightHelper, 'cyan')

  useEffect(() => {
    teleport([0, 0, 2])
  }, [teleport])

  return (
    <group>
      <OrbitControls />
      <ambientLight />
      <directionalLight
        color="#FFF"
        intensity={1}
        ref={dirLight}
        position={[5, 5, 5]}
      />
      <axesHelper args={[5]} />
      <gridHelper />
      {/* <Box position={[0, 1, 0]} /> */}
      {/* <MegaBeam /> */}
    </group>
  )
}