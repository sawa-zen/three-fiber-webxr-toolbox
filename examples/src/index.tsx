import React from "react";
import ReactDOM from "react-dom/client";
import { createXRStore, XR } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import { ConsoleProvider, PassthroughHand, RemoteDisplay, XrErrorBoundary } from "three-fiber-webxr-toolbox"
import { App } from "./App";

const socketServerUrl = import.meta.env.VITE_SOCKET_SERVER_URL as string

const store = createXRStore({
  hand: PassthroughHand,
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <button onClick={() => { store.enterAR() }}>AR</button>
    <Canvas>
      <XR store={store}>
        <ConsoleProvider>
          <RemoteDisplay
            position={[0, 1.7, -0.15]}
            scale={0.7}
            socketServerUri={socketServerUrl}
          />
          <XrErrorBoundary>
            <App />
          </XrErrorBoundary>
        </ConsoleProvider>
      </XR>
    </Canvas>
  </React.StrictMode>
);
