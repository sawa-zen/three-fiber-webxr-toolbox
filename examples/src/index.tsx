import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ARButton, Controllers, Hands, XR } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import { XrErrorBoundary, ConsoleProvider, RemoteDisplay } from "three-fiber-webxr-toolbox"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ARButton />
    <Canvas>
      <XR>
        <Controllers />
        <XrErrorBoundary>
          <ConsoleProvider>
            <App />
          </ConsoleProvider>
        </XrErrorBoundary>
      </XR>
    </Canvas>
  </React.StrictMode>
);
