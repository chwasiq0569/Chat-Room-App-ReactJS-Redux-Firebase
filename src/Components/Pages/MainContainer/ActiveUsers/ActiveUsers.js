import React from "react";
import IndividualUser from "./util1/IndividualUserFolder1/IndividualUser1";
import "./activeUsers.scss";
const ActiveUsers = () => {
  return (
    <div className="activeUsers__Wrapper">
      <div className="inner__Wrapper">
        <div className="title">
          <p>Total Members</p>
        </div>
        <div className="Users">
          <IndividualUser />
          <IndividualUser />
          <IndividualUser />
          <IndividualUser />
          <IndividualUser />
          <IndividualUser />
          <IndividualUser />
          <IndividualUser />
          <IndividualUser />
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;
