import { BackSide, DisplayP3ColorSpace, Group } from "three"
import { useRemoteDisplay } from "./hooks"
import { Interactive } from "@react-three/xr"
import { memo } from "react"

interface Props {
  position?: [number, number, number]
  rotation?: [number, number, number]
  serverUrl: string
}

export const RemoteDisplay = memo(({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  serverUrl,
}: Props) => {
  const { videoElement, handleOnSelect } = useRemoteDisplay({ serverUrl })

  return (
    <group position={position} rotation={rotation} scale={[0.3, 0.3, 0.2]}>
      <Interactive onSelect={handleOnSelect}>
        <mesh position={[0, 0, 1.5]}>
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
    </group>
  )
})
