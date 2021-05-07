import { firestore } from "./Firebase/Firebase";

// STUN server configuraion provided by google for free
const server = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

var pc = new RTCPeerConnection(server);

var localVideo = document.querySelector(".local-video");
var remoteVideo = document.querySelector(".remote-video");
var callInput = document.querySelector(".callInput");

export var webicamConnection = async () => {
  try {
    var localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }); // this will ask for permission to allow webcam
    // console.log(localStream);
    var remoteStream = new MediaStream(); // empty Media Stream
    // console.log(remoteStream);

    //pushing tracks from local stream to peer connection

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    //pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    localVideo.srcObject = localStream;
    remoteVideo.srcObject = remoteStream;

    
  } catch (error) {
    console.log(error);
  }
};

export var createOffer = async () => {
  try {
    var callDocument = firestore.collection("calls").doc();
    var offerCandidates = callDocument.collection("offerCandidates");
    var answerCandidates = callDocument.collection("answerCandidates");
    callInput.value = callDocument.id;
    console.log(callInput.value);
    pc.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };
    //create offer
    var offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    var offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDocument.set({ offer });

    //listen for remote answer
    callDocument.onSnapshot((snapshot) => {
      var data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export var answerCall = async () => {
  var callId = callInput.value;
  const callDocument = firestore.collection("calls").doc(callId);
  var offerCandidates = callDocument.collection("offerCandidates");
  var answerCandidates = callDocument.collection("answerCandidates");
  pc.onicecandidate = (event) => {
    event.candidate && answerCandidates.add(event.candidate.toJSON());
  };
  var callData = (await callDocument.get()).data();

  var offerDescription = callData.offer;
  await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    sdp: answerDescription.sdp,
    type: answerDescription.type,
  };
  await callDocument.update({ answer });

  offerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      console.log(change);

      if (change.type === "added") {
        var data = change.doc.data();
        pc.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
};
