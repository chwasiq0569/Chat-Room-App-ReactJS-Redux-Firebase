import React, { useState } from "react";
import LeftSideBar from "./../../LeftSideBar/LeftSideBar";
import "./mainContainer.scss";
import AdsSection from "./AdsSection/AdsSection";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import Routes from "./Routes";

const MainContainerComp = ({ renderStories, condition }) => {
  return (
    <div className="mainContainerComp__Wrapper">
      <div className="inner__Wrapper">
        <div className="leftSide__Wrapper">
          <div className="leftSide__Comp">
            <LeftSideBar condition={condition} renderStories={renderStories} />
          </div>
          <Routes />
        </div>
        <div className="rightSide__Wrapper">
          <motion.div
            className="AdsSection__Wrapper"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <AdsSection />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(MainContainerComp);
