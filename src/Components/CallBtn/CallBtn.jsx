import React from "react";
import { createOffer } from "../../utility";

const CallBtn = () => {
  return (
    <button className="call-btn" onClick={createOffer}>
      Call
    </button>
  );
};

export default CallBtn;
