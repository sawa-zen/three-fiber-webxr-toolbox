import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ARButton, XR } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import { XrErrorBoundary, ConsoleProvider, RemoteDisplay, Portal } from "three-fiber-webxr-toolbox"

const socketServerUrl = import.meta.env.VITE_SOCKET_SERVER_URL as string

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ARButton
      sessionInit={{ optionalFeatures: ['hand-tracking'] }}
    />
    <Canvas>
      <XR>
        <ConsoleProvider>
          <RemoteDisplay
            position={[0, 1.1, -0.1]}
            scale={0.7}
            socketServerUri={socketServerUrl}
          />
          <XrErrorBoundary>
            <Portal position={[0, 0.5, -0.6]} />
            <App />
          </XrErrorBoundary>
        </ConsoleProvider>
      </XR>
    </Canvas>
  </React.StrictMode>
);
