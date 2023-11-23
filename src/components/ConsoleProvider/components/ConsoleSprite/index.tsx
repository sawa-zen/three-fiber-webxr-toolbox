import { CanvasTexture, Mesh, RepeatWrapping, Vector3 } from "three"
import { drawErrorCard } from "./utils"
import { useXR } from "@react-three/xr"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"

interface Props {
  messages: string[]
}

export const ConsoleSprite = ({ messages }: Props): JSX.Element => {
  const meshRef = useRef<Mesh | null>(null)
  const canvasTextureRef = useRef<CanvasTexture>(null)
  const { gl, camera } = useThree()
  const { player, isPresenting } = useXR()

  const canvas = useMemo(() => {
    const tmp = document.createElement('canvas');
    tmp.width = 320
    tmp.height = 640
    return tmp
  }, [messages])

  useEffect(() => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawErrorCard(ctx, canvas.width, canvas.height, messages)
    if (canvasTextureRef.current) {
      canvasTextureRef.current.needsUpdate = true
    }
  }, [canvas, messages])

  useFrame(() => {
    const targetCamera = isPresenting ? gl.xr.getCamera() : camera
    const targetPosition = isPresenting ? player.position.clone() : camera.position.clone()
    const cameraDirection = targetCamera.getWorldDirection(new Vector3()).normalize()
    // カメラの向きを25度左に向ける
    cameraDirection.applyAxisAngle(new Vector3(0, 1, 0), Math.PI / 180 * 25)
    const position = targetPosition.add(cameraDirection.multiplyScalar(5))
    // カメラの向きに合わせてスプライトを回転させる
    meshRef.current?.lookAt(targetCamera.position)
    meshRef.current?.position.copy(position)
  })

  return (
    <mesh ref={meshRef} scale={3}>
      <planeGeometry args={[0.5, 1]} />
      <meshBasicMaterial>
        <canvasTexture
          ref={canvasTextureRef}
          attach="map"
          image={canvas}
          wrapS={RepeatWrapping}
          wrapT={RepeatWrapping}
        />
      </meshBasicMaterial>
    </mesh>
  )
}
