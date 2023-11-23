import { createRoot } from 'react-dom/client'
import { VRButton, XR } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import { ErrorBoundary } from 'react-error-boundary'
import { MainScene } from './scenes/MainScene'
import { useCallback } from 'react'
import './global.css'

const rootElement = document.getElementById('root')

export const App = () => {
  const handleSelectionStart = useCallback(() => {
    console.log('selection started')
  }, [])

  return (
    <>
      <VRButton />
      <Canvas camera={{ position: [2, 2, 2] }}>
        <XR onSessionStart={handleSelectionStart}>
          <ErrorBoundary
            fallback={(
              <>
                <ambientLight />
                <mesh scale={1} position={[1.2, 1, -3]}>
                  <boxGeometry args={[2, 2, 2]} />
                  <meshStandardMaterial color="red" />
                </mesh>
              </>
            )}
          >
            <MainScene />
          </ErrorBoundary>
        </XR>
      </Canvas>
    </>
  )
}

try {
  if (rootElement) {
    createRoot(rootElement).render(
      <App />
    )
  }
} catch (error) {
  console.info(error)
}
