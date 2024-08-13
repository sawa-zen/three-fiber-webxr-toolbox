import { extend, createPortal, useFrame } from '@react-three/fiber'
import { PointerCursorModel, useTouchPointer, useXRHandState, XRHandModel, XRSpace } from '@react-three/xr';
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Mesh, MeshBasicMaterial, Object3D } from 'three';

export const useIsomorphicLayoutEffect =
typeof window !== 'undefined' && (window.document?.createElement || window.navigator?.product === 'ReactNative')
  ? useLayoutEffect : useEffect;

export interface Props {
  modelLeft?: string
  modelRight?: string
}

export const PassthroughHands = ({ modelLeft, modelRight }: Props) => {
  const state = useXRHandState()
  const middleFingerRef = useRef<Object3D>(null)
  const pointer = useTouchPointer(middleFingerRef, state)

  // const controllers = useXR((state) => state.controllers)
  // const leftHandsRef = useRef<OculusHandModel | null>(null)
  // const rightHandsRef = useRef<OculusHandModel | null>(null)

  // useMemo(() => extend({ OculusHandModel }), [])

  // useIsomorphicLayoutEffect(() => {
  //   for (const target of controllers) {
  //     if (!target.inputSource) continue
  //     target.hand.dispatchEvent({
  //       type: 'connected',
  //       data: target.inputSource,
  //     })
  //   }
  // }, [controllers, modelLeft, modelRight])

  // useFrame(() => {
  //   if (leftHandsRef.current) {
  //     leftHandsRef.current.traverse((obj) => {
  //       if (obj instanceof Mesh) {
  //         obj.material.colorWrite = false
  //         obj.renderOrder = -1
  //       }
  //     })
  //   }
  //   if (rightHandsRef.current) {
  //     rightHandsRef.current.traverse((obj) => {
  //       if (obj instanceof Mesh) {
  //         obj.material.colorWrite = false
  //         obj.renderOrder = -1
  //       }
  //     })
  //   }
  // })

  return (
    <>
      <XRSpace ref={middleFingerRef} space={() => state.inputSource.hand.get('middle-finger-tip')} />
      <Suspense>
        <XRHandModel />
      </Suspense>
      <PointerCursorModel pointer={pointer} ppp />
    </>
  )
}
