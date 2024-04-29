import { memo } from 'react'
import { Interactive } from '@react-three/xr'
import { DisplayP3ColorSpace } from 'three'
import { useRemoteDisplay } from './hooks'

interface Props {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  serverUrl: string
}

export const RemoteDisplay = memo(({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  serverUrl,
}: Props) => {
  const { videoElement, handleOnSelect } = useRemoteDisplay({ serverUrl })

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Interactive onSelect={handleOnSelect}>
        <mesh position={[0, 0, 0.5]}>
          <cylinderGeometry
            args={[
              1, // radiusTop?: number,
              1, // radiusBottom?: number,
              0.8, // height?: number,
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
