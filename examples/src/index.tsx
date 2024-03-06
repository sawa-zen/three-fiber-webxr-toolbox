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
        <ConsoleProvider>
          <RemoteDisplay
            serverUrl={import.meta.env.VITE_SERVER_URL as string}
            position={[0, 1.1, -1.1]}
          /> 
          <XrErrorBoundary>
              <App />
          </XrErrorBoundary>
        </ConsoleProvider>
      </XR>
    </Canvas>
  </React.StrictMode>
);
