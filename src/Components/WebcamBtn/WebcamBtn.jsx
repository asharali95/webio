import React from "react";
import { webicamConnection } from "../../utility";
const WebcamBtn = () => {
  return (
    <button className="webcam-button" onClick={ webicamConnection}>
      Start webcam
    </button>
  );
};

export default WebcamBtn;
