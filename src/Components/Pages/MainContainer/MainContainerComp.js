import React, { useEffect, useState } from "react";
import Timeline from "./Timeline/Timeline";
import LeftSideBar from "./../../LeftSideBar/LeftSideBar";
import "./mainContainer.scss";
import AdsSection from "./AdsSection/AdsSection";
import ActiveUsers from "./ActiveUsers/ActiveUsers";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Favourites from "./Favourites/Favourites";
import Tagged from "./Tagged/Tagged";
import Notifications from "./Notifications/Notifications";
import { motion } from "framer-motion";

const MainContainerComp = React.memo(({
  condition,
  renderStories,
  upload,
  handleUpload,
  image,
}) => {
  return (
    <div className="mainContainerComp__Wrapper">
      <div className="inner__Wrapper">
        <div className="leftSide__Wrapper">
          <div className="leftSide__Comp">
            <LeftSideBar
              condition={condition}
              upload={upload}
              renderStories={renderStories}
              handleUpload={handleUpload}
              image={image}
            />
          </div>
          <div className="timeline__Comp">
            {/* <Timeline /> */}
            <Route path="/maincomponent/timeline" component={Timeline} />
            <Route path="/maincomponent/favourites" component={Favourites} />
            <Route path="/maincomponent/tagged" component={Tagged} />
            <Route
              path="/maincomponent/notifications"
              component={Notifications}
            />
          </div>
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
          {/* <motion.div
            className="activeUsers__Comp"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          > */}
            {/* <ActiveUsers /> */}
          {/* </motion.div> */}
        </div>
      </div>
    </div>
  );
});
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(MainContainerComp);
