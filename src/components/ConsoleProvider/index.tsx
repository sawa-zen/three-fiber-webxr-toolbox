import { createContext, useCallback, useContext, useState } from "react"
import { ConsoleSprite } from "./components/ConsoleSprite"

interface Props {
  children: React.ReactNode
}

interface ConsoleContextValue {
  messages: string[]
  pushMessage: (message: string) => void
}

const ConsoleContext = createContext<ConsoleContextValue>({
  messages: [],
  pushMessage: () => {}
})

export const useConsole = () => {
  return useContext(ConsoleContext)
}

export const ConsoleProvider = ({ children }: Props) => {
  const [messages, setMessages] = useState<string[]>([])

  const pushMessage = useCallback((message: string) => {
    // ラスト24件のみ保持
    setMessages((prev) => [...prev, message].slice(-24))
  }, [])

  return (
    <ConsoleContext.Provider value={{ messages, pushMessage }}>
      <ConsoleSprite messages={messages} />
      {children}
    </ConsoleContext.Provider>
  )
}
