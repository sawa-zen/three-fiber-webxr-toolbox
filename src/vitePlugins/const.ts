export const senderHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sender</title>
  <script src="https://cdn.socket.io/4.7.2/socket.io.min.js" integrity="sha384-mZLF4UVrpi/QTWPA7BjNPEnkIfRFn4ZEO3Qt/HFklTJBj/gBOV8G3HcKn4NfQblz" crossorigin="anonymous"></script>
</head>
<body>
  <video id="my_video" autoplay playsinline style="border: 1px solid black;" width="400"></video>
  <button id="start_capture">Screen Sharing</button>
  <script>
    (async () => {
      let isStarted = false
      const socket = io()
      const myPeer = new RTCPeerConnection()

      const startCaptureButton = document.getElementById('start_capture')
      const myVideo = document.getElementById('my_video')

      const sendOffer = async () => {
        const offer = await myPeer.createOffer()
        await myPeer.setLocalDescription(offer)
        socket.emit('SEND_OFFER', { sdp: myPeer.localDescription })
      }

      const handleRecieveAnswer = (sdp) => {
        const answer = new RTCSessionDescription(sdp);
        myPeer.setRemoteDescription(answer)
      }

      const handleReceiveCandidate = (ice) => {
        if (!isStarted) return
        const candidate = new RTCIceCandidate(ice);
        myPeer.addIceCandidate(candidate)
      }

      const handleStartCaptureButton = () => {
        navigator.mediaDevices
          .getDisplayMedia({
            video: {
              frameRate: 16,
              displaySurface: "monitor",
              width: { ideal: 1680 * 2, max: 1680 * 2 },
              height: { ideal: 945 * 2, max: 945 * 2 },
              noiseSuppression: true,
            },
          })
          .then(async stream => {
            isStarted = true
            myVideo.srcObject = stream
            await myVideo.play()
            stream.getTracks().forEach(track => {
              if( track.kind && track.kind == 'video') track.contentHint = "detail";
              myPeer.addTrack(track, stream)
            })
            startCaptureButton.disabled = true
          })
      }

      const handleOnIceCandidate = event => {
        if (!event.candidate) return
        socket.emit('SEND_CANDIDATE', { ice: event.candidate })
      }

      const handleReceiveCall = () => {
        if (!isStarted) return
        sendOffer()
      }

      myPeer.onicecandidate = handleOnIceCandidate
      socket.on('RECEIVE_CALL', handleReceiveCall)
      socket.on('RECEIVE_ANSWER', handleRecieveAnswer)
      socket.on('RECEIVE_CANDIDATE', handleReceiveCandidate)
      startCaptureButton.addEventListener('click', handleStartCaptureButton)
    })()
  </script>
</body>
</html>
`
