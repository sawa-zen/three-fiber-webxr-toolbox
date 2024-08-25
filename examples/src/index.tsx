import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { createXRStore, XR } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import { XrErrorBoundary, ConsoleProvider, RemoteDisplay, Portal } from "three-fiber-webxr-toolbox"

const socketServerUrl = import.meta.env.VITE_SOCKET_SERVER_URL as string
const store = createXRStore()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <button
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 100,
        margin: "auto",
        zIndex: 100,
        width: 200,
        height: 50,
        border: "3px solid black",
      }}
      onClick={() => store.enterAR()}
    >
      Enter AR
    </button>
    <Canvas>
      <XR store={store}>
        <ConsoleProvider>
          <RemoteDisplay
            position={[0, 1.0, -0.1]}
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
