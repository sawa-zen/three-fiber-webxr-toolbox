import { useCallback, useEffect, useMemo, useRef } from "react"
import { io } from "socket.io-client"
import { useConsole } from "../ConsoleProvider";

interface Props {
  socketServerUri: string
}

export const useRemoteDisplay = ({
  socketServerUri,
}: Props) => {
  const loading = useRef(false)
  const started = useRef(false)
  const videoElement = useMemo(() => document.createElement("video"), [])
  const { pushMessage } = useConsole()
  const socket = useMemo(() => io(socketServerUri), [])
  const peer = useMemo(() => new RTCPeerConnection(), [])

  const handleOnTrack = useCallback((event: any) => {
    pushMessage('handleOnTrack')
    videoElement.srcObject = event.streams[0]
    videoElement.play()
  }, [])

  const handleOnIceCandidate = useCallback((event: any) => {
    pushMessage('handleOnIceCandidate')
    if (!event.candidate) return
    socket.emit('SEND_CANDIDATE', { ice: event.candidate })
  }, [])

  const handleRecieveOffer = useCallback(async (sdp: any) => {
    pushMessage('handleRecieveOffer')
    const offer = new RTCSessionDescription(sdp)
    await peer.setRemoteDescription(offer)
    const answer = await peer.createAnswer()
    await peer.setLocalDescription(answer)
    socket.emit('SEND_ANSWER', { sdp: peer.localDescription })
    loading.current = false
    started.current = true
  }, [])

  const handleReceiveCandidate = useCallback((ice: any) => {
    pushMessage('handleReceiveCandidate')
    const candidate = new RTCIceCandidate(ice);
    peer.addIceCandidate(candidate)
  }, [])

  const handleRecieveDisconnect = useCallback(() => {
    loading.current = false
    started.current = false
    videoElement.srcObject = null
    pushMessage('The other party has disconnected')
  }, [])

  const handleOnSelect = useCallback(() => {
    pushMessage('handleOnSelect')
    socket.emit('SEND_CALL')
  }, [])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'a' || started.current) return
    pushMessage(event.key)
    loading.current = true
    socket.emit('SEND_CALL')
    setTimeout(() => {
      if (!loading.current) return
      pushMessage('Failed to connect')
      loading.current = false
    }, 1000)
  }, [])

  useEffect(() => {
    peer.ontrack = handleOnTrack
    peer.onicecandidate = handleOnIceCandidate
    socket.on('RECEIVE_OFFER', handleRecieveOffer)
    socket.on('RECEIVE_CANDIDATE', handleReceiveCandidate)
    socket.on('RECEIVE_DISCONNECT', handleRecieveDisconnect)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      peer.ontrack = null
      peer.onicecandidate = null
      socket.off('RECEIVE_OFFER', handleRecieveOffer)
      socket.off('RECEIVE_CANDIDATE', handleReceiveCandidate)
      socket.off('RECEIVE_DISCONNECT', handleRecieveDisconnect)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return {
    started,
    videoElement,
    handleOnSelect,
  }
}
