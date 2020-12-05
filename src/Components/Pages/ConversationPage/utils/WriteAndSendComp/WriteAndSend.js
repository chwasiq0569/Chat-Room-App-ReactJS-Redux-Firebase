import React from "react";
import "./writeandsend.scss";
import { MdSend } from "react-icons/md";

const WriteAndSend = ({ onChange, sendMessage, message }) => {
  return (
    <div className="posting__Section">
      <div className="leftSide">
        <div className="posting__Text">
          <textarea
            placeholder="Type Something..."
            value={message}
            onChange={onChange}
          ></textarea>
        </div>
      </div>
      <div className="rightSide">
        <div>
          {/* if message is not types then diable send Btn and enable when msg is written */}
          <button
            style={{ backgroundColor: "white", border: "none" }}
            onClick={sendMessage}
            disabled={!message}
          >
            {!message ? (
              <MdSend color="#9fa7a7" size="1.3rem" />
            ) : (
              <MdSend color="#577eda" size="1.3rem" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteAndSend;
