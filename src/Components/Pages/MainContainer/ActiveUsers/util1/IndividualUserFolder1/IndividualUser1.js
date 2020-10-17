import React from "react";
import User_Profile_Pic from "../../../../../../Images/download.jpg";
import { FiMessageCircle } from "react-icons/fi";
import "./individualuser.scss";
const IndividualUser = () => {
  return (
    <div className="User">
      <div className="userProfile">
        <div className="userProfile__Pic">
          <img src={User_Profile_Pic} alt="User_Profile_Pic" />
        </div>
        <div className="username">
          <p>Template</p>
        </div>
      </div>
      <div className="Add__Icon">
        <FiMessageCircle color="#9fa7a7" size="1rem" />
      </div>
    </div>
  );
};

export default IndividualUser;
