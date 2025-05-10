import { CanvasTexture, RepeatWrapping, Vector3 } from "three"
import { drawErrorCard } from "./utils"
import { useXR } from "@react-three/xr"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"

interface Props {
  message: string
}

export const ErrorSprite = ({ message }: Props) => {
  const canvasTextureRef = useRef<CanvasTexture>(null)
  const { gl, camera } = useThree()
  const { player, isPresenting } = useXR()
  const [position, setPosition] = useState<Vector3>(player.getWorldDirection(new Vector3()))

  const canvas = useMemo(() => {
    const tmp = document.createElement('canvas');
    tmp.width = 640
    tmp.height = 640
    return tmp
  }, [message])

  useEffect(() => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawErrorCard(ctx, canvas.width, canvas.height, message)
    if (canvasTextureRef.current) {
      canvasTextureRef.current.needsUpdate = true
    }
  }, [canvas, message])

  useFrame(() => {
    const targetCamera = isPresenting ? gl.xr.getCamera() : camera
    const targetPosition = isPresenting ? player.position.clone() : camera.position.clone()
    const cameraDirection = targetCamera.getWorldDirection(new Vector3()).normalize()
    const position = targetPosition.add(cameraDirection.multiplyScalar(5))
    setPosition(position)
  })

  return (
    <sprite scale={3} position={position}>
      <spriteMaterial>
        <canvasTexture
          ref={canvasTextureRef}
          attach="map"
          image={canvas}
          wrapS={RepeatWrapping}
          wrapT={RepeatWrapping}
        />
      </spriteMaterial>
    </sprite>
  )
}
