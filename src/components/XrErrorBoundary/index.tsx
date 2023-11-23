import { ErrorBoundary } from 'react-error-boundary'
import { ErrorSprite } from './components/ErrorSprite'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const XrErrorBoundary = (props: Props) => {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <ErrorSprite message={error.message} />
      )}
      {...props}
    />
  )
}
