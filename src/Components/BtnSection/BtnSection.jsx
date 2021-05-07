import React from "react";
import WebcamBtn from "../WebcamBtn/WebcamBtn";
import CallBtn from "../CallBtn/CallBtn";
import CallInput from "../CallInput/CallInput";
import AnswerBtn from "../AnswerBtn/AnswerBtn";
import HangupBtn from "../HangupBtn/HangupBtn";

import "./btnSection.css";

const BtnSection = () => {
  return (
    <div className="button-section flex">
      <WebcamBtn />
      <CallBtn />
      <CallInput />
      <AnswerBtn />
      <HangupBtn />
    </div>
  );
};

export default BtnSection;
