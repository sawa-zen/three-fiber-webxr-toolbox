import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { createXRStore, XR } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";

const store = createXRStore()
// const socketServerUrl = import.meta.env.VITE_SOCKET_SERVER_URL as string

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Canvas>
      <XR store={store}>
        <App />
      </XR>
    </Canvas>
  </React.StrictMode>
);
