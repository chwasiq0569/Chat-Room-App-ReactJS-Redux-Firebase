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
          {/* Hello How are You Bro?Hello How are You Bro?Hello How are You
          Bro?Hello How are You Bro?Hello How are You Bro?Hello How are You
          Bro?Hello How are You Bro?Hello How are You Bro?Hello How are You
          Bro?Hello How are You Bro?Hello How are You Bro?Hello How are You
          Bro?Hello How are You Bro?Hello How are You Bro? */}
          {msg.username}: {msg.message}
        </p>
      </div>
    </div>
  );
};

export default OthersMsg;
