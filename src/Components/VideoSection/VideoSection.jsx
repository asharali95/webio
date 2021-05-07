import LocalVideoSpan from "../LocalVideoSpan/LocalVideoSpan";
import RemoteVideoSpan from "../RemoteVideoSpan/RemoteVideoSpan";

import "./videoSection.css"

const VideoSection = () => {
  return (
    <div className="video-section flex">
      <LocalVideoSpan />
      <RemoteVideoSpan />
    </div>
  );
};

export default VideoSection;
