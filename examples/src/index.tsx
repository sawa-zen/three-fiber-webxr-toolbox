import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ARButton, XR } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import { XrErrorBoundary, ConsoleProvider, RemoteDisplay } from "three-fiber-webxr-toolbox"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ARButton 
      sessionInit={{ optionalFeatures: ["hand-tracking"] }}
    />
    <Canvas>
      <XR>
        <RemoteDisplay 
          serverUrl={import.meta.env.VITE_SERVER_URL as string}
          position={[0, 1.5, -1]} 
        /> 
        <XrErrorBoundary>
          <ConsoleProvider>
            <App />
          </ConsoleProvider>
        </XrErrorBoundary>
      </XR>
    </Canvas>
  </React.StrictMode>
);
