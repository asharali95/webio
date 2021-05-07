import React from "react";

const LocalVideoSpan = () => {
  return (
    <span>
      <h2>Local</h2>
      <video className="local-video" autoPlay playsInline />
    </span>
  );
};

export default LocalVideoSpan;
