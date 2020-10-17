import React, { useEffect, useState } from "react";
import { FiActivity } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineBell } from "react-icons/ai";
import ProfilePlaceholder from "../../Images/download.jpg";
import "./upperHeader.scss";
import { FiLogOut } from "react-icons/fi";
import fire from "../Firebase/Firebase";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { check_User } from "./../../Redux/Actions/userActions";
import { motion } from "framer-motion";

const UpperHeader = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = fire.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        if (user) {
          props.check_User(user);
        }
      } else {
        setUser(authUser);
        if (user === null) {
          props.check_User(authUser);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const signOut = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signOut()
      .then(function () {
        props.check_User(null);
        props.history.replace("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <motion.div
      className="UpperHeader__Wrapper"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.5 }}
    >
      <div className="inner__Wrapper">
        <div className="leftSide">
          <div className="brandLogo__Container">
            <Link to="/maincomponent/timeline">
              <FiActivity size="1.8rem" />
            </Link>
          </div>
          <div className="searchbar__Container">
            <input className="searchBox" type="search" placeholder="Search" />
          </div>
        </div>
        <div className="rightSide">
          <div className="messages">
            <Link
              to="/conversations"
            >
              <FiMessageCircle size="1.4rem" color={props.history.location.pathname === "/conversations" ? "#577eda" : "#9fa7a7"} />
            </Link>
          </div>
          <div className="notification__icon">
            <Link
              to="/maincomponent/notifications"
            >
              <AiOutlineBell size="1.5rem" color={props.history.location.pathname === "/maincomponent/notifications" ? "#577eda" : "#9fa7a7"} />
            </Link>
          </div>
          <div className="User__Profile">
            <img src={ProfilePlaceholder} alt="user_Profile_Pic" />
          </div>
          <div
            className="notification__icon"
            onClick={signOut}
          >
              <FiLogOut size="1.4rem" color="#577eda" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    check_User: (user) => dispatch(check_User(user)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpperHeader));
