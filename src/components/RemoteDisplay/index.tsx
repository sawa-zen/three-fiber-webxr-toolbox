import { DisplayP3ColorSpace, LinearFilter } from "three"
import { useRemoteDisplay } from "./hooks"
import { Interactive } from "@react-three/xr"
import { memo } from "react"

interface Props {
  position?: [number, number, number]
}

export const RemoteDisplay = memo(({
  position = [0, 0, 0]
}: Props) => {
  const { videoElement, handleOnSelect } = useRemoteDisplay()

  return (
    <Interactive onSelect={handleOnSelect}>
      <mesh position={position}>
        <planeGeometry args={[16 / 5, 9 / 5]} />
        <meshBasicMaterial attach="material">
          <videoTexture
            attach="map"
            args={[videoElement]}
            colorSpace={DisplayP3ColorSpace}
          />
        </meshBasicMaterial>
      </mesh>
    </Interactive>
  )
})
