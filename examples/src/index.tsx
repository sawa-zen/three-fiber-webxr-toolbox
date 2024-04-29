import { createRoot } from "react-dom/client"
import { App } from "./App"
import { ARButton, Controllers, Hands, XR } from "@react-three/xr"
import { Canvas } from "@react-three/fiber"
import { XrErrorBoundary, ConsoleProvider, RemoteDisplay } from "three-fiber-webxr-toolbox"

createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <ARButton />
    <Canvas>
      <XR>
        <Controllers />
        <XrErrorBoundary>
          <ConsoleProvider>
            <RemoteDisplay position={[0, 0.9, -3]} />
            <App />
          </ConsoleProvider>
        </XrErrorBoundary>
      </XR>
    </Canvas>
  </>
)
