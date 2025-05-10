import React from "react";
import ReactDOM from "react-dom/client";
import { createXRStore, XR } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import { XrErrorBoundary } from "three-fiber-webxr-toolbox"
import { App } from "./App";

const store = createXRStore()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <button onClick={() => { store.enterAR() }}>AR</button>
    <Canvas>
      <XR store={store}>
        <XrErrorBoundary>
          <App />
        </XrErrorBoundary>
      </XR>
    </Canvas>
  </React.StrictMode>
);
