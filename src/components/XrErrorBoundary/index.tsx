import { ErrorSprite } from './components/ErrorSprite'
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class XrErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.error(error)
    // 子コンポーネントで例外が発生すると呼ばれる。
    // 戻り値では、コンポーネントの状態を返す必要がある。
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // 発生したエラーのログを取得する
    console.error('ErrorBoundary:', error, info);
  }

  render() {
    const { error } = this.state

    if (error) {
      // エラーがある場合は、fallbackをレンダリングする
      return (<ErrorSprite message={error.message} />)
    }
    // エラーがない場合は、childrenをレンダリングする
    return this.props.children;
  }
}
