import { ReactNode, useEffect, useRef } from "react"
import { renderToString } from "react-dom/server"
import { CanvasTexture, MeshBasicMaterial } from "three"
import html2canvas from "html2canvas"

interface Props {
  children: ReactNode
  size: [number, number]
  debug?: boolean
}

export const HtmlMaterial = ({
  children,
  size,
  debug = false
}: Props) => {
  const materialRef = useRef<MeshBasicMaterial | null>(null)
  const htmlString = renderToString(children)

  useEffect(() => {
    const exec = async () => {
      const container = document.createElement('div')
      container.style.width = `${size[0] * 100}px`
      container.style.height = `${size[1] * 100}px`
      container.style.backgroundColor = 'white'
      container.style.position = 'fixed'
      container.style.top = debug ? '0px' : '-1000000px'
      container.style.left = debug ? '0px' : '-1000000px'
      container.style.zIndex = '9999'
      container.innerHTML = htmlString;
      document.body.appendChild(container);

      const canvas = await html2canvas(container)
      materialRef.current!.map = new CanvasTexture(canvas)
      materialRef.current!.needsUpdate = true
    }
    exec()
    return () => {
      document.body.removeChild(document.body.lastChild as Node)
    }
  }, [size[0], size[1], htmlString, debug])

  return (
    <meshBasicMaterial ref={materialRef} side={2} />
  )
}
