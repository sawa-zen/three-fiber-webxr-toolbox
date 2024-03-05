import { BackSide, DisplayP3ColorSpace } from "three"
import { useRemoteDisplay } from "./hooks"
import { Interactive } from "@react-three/xr"
import { memo } from "react"

interface Props {
  position?: [number, number, number]
  serverUrl: string
}

export const RemoteDisplay = memo(({
  position = [0, 0, 0],
  serverUrl,
}: Props) => {
  const { videoElement, handleOnSelect } = useRemoteDisplay({ serverUrl })

  return (
    <Interactive onSelect={handleOnSelect}>
      <mesh position={position}>
        <cylinderGeometry 
          args={[
            3, // radiusTop?: number,
            3, // radiusBottom?: number,
            2.5, // height?: number,
            24, // radialSegments?: number,
            5, // heightSegments?: number,
            true, // openEnded?: boolean,
            Math.PI + (Math.PI / 4.4), // thetaStart?: number,
            -(Math.PI / 2.2), // thetaLength?: number,
          ]}
        />
        <meshBasicMaterial>
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
