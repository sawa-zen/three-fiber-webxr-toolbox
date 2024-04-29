import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { io } from "socket.io-client"
import { useConsole } from "../ConsoleProvider";

const getWellFormedHtml = (html: string) => {
  const doc = document.implementation.createHTMLDocument("test");
  const range = doc.createRange();
  range.selectNodeContents(doc.documentElement);
  range.deleteContents();
  const h = document.createElement("head");
  doc.documentElement.appendChild(h);
        doc.documentElement.appendChild(range.createContextualFragment(html));
  console.log("doc.documentElement.namespaceURI : "+doc.documentElement.namespaceURI);
  doc.documentElement.setAttribute("xmlns", doc.documentElement.namespaceURI || '');

  // Get well-formed markup
  const wfHtml = (new XMLSerializer).serializeToString(doc);
  console.log(wfHtml);
  return wfHtml.replace(/\<\!DOCTYPE html\>/, "");
};

export const useRemoteDisplay = () => {
  const loading = useRef(false)
  const started = useRef(false)
  const videoElement = useMemo(() => document.createElement("video"), [])
  const { pushMessage } = useConsole()
  const socket = useMemo(() => io("https://localhost:3000"), [])
  const peer = useMemo(() => new RTCPeerConnection(), [])

  const canvasElement = useMemo(() => {
    const c = document.createElement("canvas")
    c.width = 640
    c.height = 480
    return c
  }, [])
  const html = useMemo(() => getWellFormedHtml("<html><head><title>test</title></head><body><h1 style=\"color: red;\">test</h1></body></html>"), [])
  const data = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasElement.width}" height="${canvasElement.height}">` +
        `<foreignObject width="100%" height="100%">${html}</foreignObject></svg>`;

  useEffect(() => {
    const img = new Image();
    const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(data);
    img.onload = () => {
      console.log("img.onload");
      const ctx = canvasElement.getContext("2d");
      ctx!.drawImage(img, 0,0);
    };
    img.src = url;
  }, [])

  const start = useCallback(async () => {
    if (started.current || loading.current) return
    loading.current = true
    socket.emit('SEND_CALL')
    setTimeout(() => {
      if (!loading.current) return
      pushMessage('接続に失敗しました')
      loading.current = false
    }, 1000)
  }, [])

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
    pushMessage('相手が切断しました')
  }, [])

  const handleOnSelect = useCallback(() => {
    start()
  }, [])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'a') return
    start()
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
    videoElement,
    canvasElement,
    handleOnSelect,
  }
}
