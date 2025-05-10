import { useRemoteDisplay } from "./hooks"
import { Interactive } from "@react-three/xr"
import { memo } from "react"
import { HtmlMaterial } from "../HtmlMaterial"
import { LinearSRGBColorSpace, SRGBColorSpace } from "three"

interface Props {
  position?: [number, number, number]
  scale?: number
  socketServerUri: string
}

export const RemoteDisplay = memo(({
  position = [0, 0, 0],
  scale = 1,
  socketServerUri,
}: Props) => {
  const {
    started,
    videoElement,
    handleOnSelect,
  } = useRemoteDisplay({ socketServerUri })

  return (
    <Interactive onSelect={handleOnSelect}>
      <mesh
        position={position}
        scale={[scale, scale, scale]}
        onClick={handleOnSelect}
      >
        <cylinderGeometry
          args={[
            1, // radiusTop?: number,
            1, // radiusBottom?: number,
            0.85, // height?: number,
            24, // radialSegments?: number,
            5, // heightSegments?: number,
            true, // openEnded?: boolean,
            Math.PI + (Math.PI / 4.4), // thetaStart?: number,
            -(Math.PI / 2.2), // thetaLength?: number,
          ]}
        />
        {started.current ? (
          <meshBasicMaterial
            attach="material"
          >
            <videoTexture
              attach="map"
              args={[videoElement]}
              colorSpace={SRGBColorSpace}
            />
          </meshBasicMaterial>
        ) : (
          <HtmlMaterial size={[1.6 * 2, 0.9 * 2]}>
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
                boxSizing: 'border-box',
                border: '4px solid gray',
                color: 'white',
              }}
            >
              <p>Click to connect</p>
            </div>
          </HtmlMaterial>
        )}
      </mesh>
    </Interactive>
  )
})
