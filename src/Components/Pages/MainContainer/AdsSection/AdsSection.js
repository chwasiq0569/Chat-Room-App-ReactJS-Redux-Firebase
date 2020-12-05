import React from "react";
import Olympics__Banner from "../../../../Images/olympicBanner.png";
import "./adssection.scss";
import IndividualUser from "./util/IndividualUser/IndividualUser";

const AdsSection = () => {
  return (
    <div className="AdsSection__Wrapper">
      <div className="inner__Wrapper">
        <div className="upperPart">
          <div className="title">Promotions</div>
          <div className="banner__Image">
            <img src={Olympics__Banner} alt="bannerImage__Promotion" />
          </div>
          <div className="banner__Info">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="lowerPart">
          <div className="suggestions__Section">
            <div className="suggestions__Text">
              <p>Suggestions</p>
            </div>
            <IndividualUser />
            <IndividualUser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsSection;
