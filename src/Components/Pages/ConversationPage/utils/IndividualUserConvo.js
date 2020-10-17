import React from "react";
import User_Profile_Pic from "../../../../Images/download.jpg";
import "./individualUserConvo.scss";
const IndividualUser = () => {
  return (
    <div className="User">
      <div className="userProfile">
        <div className="userProfile__Pic">
          <img src={User_Profile_Pic} alt="User_Profile_Pic" />
        </div>
        <div className="username">
          <p>Convo</p>
        </div>
      </div>
    </div>
  );
};

export default IndividualUser;
