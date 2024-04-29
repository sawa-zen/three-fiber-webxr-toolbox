import React from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { ARButton, XR } from '@react-three/xr'
import { ConsoleProvider, RemoteDisplay, XrErrorBoundary } from 'three-fiber-webxr-toolbox'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ARButton
      sessionInit={{ optionalFeatures: ['hand-tracking'] }}
    />
    <Canvas dpr={0.25}>
      <XR>
        <ConsoleProvider>
          <RemoteDisplay
            serverUrl={import.meta.env.VITE_SERVER_URL as string}
            position={[0, 1.1, -1]}
          />
          <XrErrorBoundary>
              <App />
          </XrErrorBoundary>
        </ConsoleProvider>
      </XR>
    </Canvas>
  </React.StrictMode>,
)
