import React from "react";
// import { remotevideo } from "../../utility";
const RemoteVideoSpan = () => {
  return (
    <span>
      <h2>Remote</h2>
      <video
        className="Remote-video"
        autoPlay
        playsInline
        // ref={(video) => {
        //   video.srcObject = remotevideo;
        // }}
      />
    </span>
  );
};

export default RemoteVideoSpan;
