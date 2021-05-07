import React from "react";
// import { localvideo } from "../../utility";
const LocalVideoSpan = () => {
  return (
    <span>
      <h2>Local</h2>
      <video
        className="local-video"
        autoPlay
        playsInline
        // ref={(video) => {
        //   video.srcObject = localvideo;
        // }}
      />
    </span>
  );
};

export default LocalVideoSpan;
