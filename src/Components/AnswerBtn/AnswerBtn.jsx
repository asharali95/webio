import React from "react";
import { answerCall } from "../../utility";

const AnswerBtn = () => {
  return <button className="answer-btn" onClick={answerCall}>Answer</button>;
};

export default AnswerBtn;
