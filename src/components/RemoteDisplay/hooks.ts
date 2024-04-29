import { useCallback, useEffect, useMemo, useRef } from 'react'
import { io } from 'socket.io-client'
import { useConsole } from '../ConsoleProvider'

interface Props {
  serverUrl: string,
}

export const useRemoteDisplay = ({ serverUrl }: Props) => {
  const loading = useRef(false)
  const started = useRef(false)
  const videoElement = useMemo(() => document.createElement('video'), [])
  const { pushMessage } = useConsole()
  const socket = useMemo(() => io(serverUrl), [serverUrl])
  const peer = useMemo(() => new RTCPeerConnection(), [])

  const sendCall = useCallback(() => {
    loading.current = true
    socket.emit('SEND_CALL')
    setTimeout(() => {
      if (!loading.current) return
      pushMessage('Failed to connect')
      loading.current = false
    }, 1000)
  }, [pushMessage, socket])

  const handleOnTrack = useCallback((event: any) => {
    videoElement.srcObject = event.streams[0]
    videoElement.play()
    pushMessage('Remote Display Connected')
  }, [pushMessage, videoElement])

  const handleOnIceCandidate = useCallback((event: any) => {
    if (!event.candidate) return
    socket.emit('SEND_CANDIDATE', { ice: event.candidate })
  }, [socket])

  const handleRecieveOffer = useCallback(async (sdp: any) => {
    const offer = new RTCSessionDescription(sdp)
    await peer.setRemoteDescription(offer)
    const answer = await peer.createAnswer()
    await peer.setLocalDescription(answer)
    socket.emit('SEND_ANSWER', { sdp: peer.localDescription })
    loading.current = false
    started.current = true
  }, [peer, socket])

  const handleReceiveCandidate = useCallback((ice: any) => {
    const candidate = new RTCIceCandidate(ice)
    peer.addIceCandidate(candidate)
  }, [peer])

  const handleRecieveDisconnect = useCallback(() => {
    loading.current = false
    started.current = false
    videoElement.srcObject = null
    pushMessage('Remote Display Disconnected')
  }, [pushMessage, videoElement])

  const handleOnSelect = useCallback(() => {
    sendCall()
  }, [sendCall])

  // a キーを押して sendCall を実行する
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'a') sendCall()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [sendCall])

  useEffect(() => {
    peer.ontrack = handleOnTrack
    peer.onicecandidate = handleOnIceCandidate
    socket.on('RECEIVE_OFFER', handleRecieveOffer)
    socket.on('RECEIVE_CANDIDATE', handleReceiveCandidate)
    socket.on('RECEIVE_DISCONNECT', handleRecieveDisconnect)

    return () => {
      peer.ontrack = null
      peer.onicecandidate = null
      socket.off('RECEIVE_OFFER', handleRecieveOffer)
      socket.off('RECEIVE_CANDIDATE', handleReceiveCandidate)
      socket.off('RECEIVE_DISCONNECT', handleRecieveDisconnect)
    }
  }, [handleOnIceCandidate, handleOnTrack, handleReceiveCandidate, handleRecieveDisconnect, handleRecieveOffer, peer, socket])

  useEffect(() => {
    if (!videoElement.srcObject) return
    videoElement.play()
  }, [videoElement])

  return {
    videoElement,
    handleOnSelect,
  }
}
