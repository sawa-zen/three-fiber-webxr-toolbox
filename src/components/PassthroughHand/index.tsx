import { XRSpace, XRHandModel, PointerCursorModel, useXRInputSourceStateContext, useTouchPointer } from '@react-three/xr';
import { Suspense, useRef } from 'react';
import { Object3D } from 'three';

export const PassthroughHand = () => {
  const state = useXRInputSourceStateContext('hand')
  const middleFingerRef = useRef<Object3D>(null)
  const pointer = useTouchPointer(middleFingerRef, state)
  return (
    <>
      <XRSpace ref={middleFingerRef} space={state.inputSource.hand.get('middle-finger-tip')!} />
      <Suspense>
        <XRHandModel renderOrder={-1} colorWrite={false} />
      </Suspense>
      <PointerCursorModel pointer={pointer} />
    </>
  )
}
