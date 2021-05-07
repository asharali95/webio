
// STUN server configuraion provided by google for free
const server = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize = 10,
};

var pc = RTCPeerConnection(server);
