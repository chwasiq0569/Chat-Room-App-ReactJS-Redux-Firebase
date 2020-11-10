import React from "react";
import OthersImg from "../../../../../Images/download.jpg";
const OthersMsg = ({ msg }) => {
  return (
    <div className="otherMessages">
      <div className="userImage">
        <img src={OthersImg} alt="friendImage" />
      </div>
      <div className="message">
        <p>
          {msg.username}: {msg.message}
        </p>
      </div>
    </div>
  );
};

export default OthersMsg;
