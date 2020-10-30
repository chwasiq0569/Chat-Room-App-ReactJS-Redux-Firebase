import React, { useState } from "react";
import { BsDroplet } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import StoryPic1 from "../../Images/Flat-Mountains.svg";
import { MdFileUpload } from "react-icons/md";
import { MdDone } from "react-icons/md";
import "./leftSidebar.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BsHash } from "react-icons/bs";
import { withRouter } from "react-router-dom";

const LeftSideBar = React.memo((props) => {
  const { condition,renderStories,upload,handleUpload,image,history } = props;

  const [hoveredStatus4, setHoveredStatus4] = useState(false);
  
  const hoverIconOne4 = () => {
    setHoveredStatus4(true);
  };
  const hoverIconTwo4 = () => {
    setHoveredStatus4(false);
  };
  return (
    <motion.div
      className="leftSideBar__Wrapper"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <div className="inner__Wrapper">
        <div className="upper__Section">
          <div className="drop__Icon">
            <Link
              to="/maincomponent/timeline"
            >
              <BsDroplet size="1.5rem" color={props.history.location.pathname === "/maincomponent/timeline" ? "#577eda" : "#9fa7a7"} />
            </Link>
          </div>
          <div className="Favourites__Icon">
            <Link
              to="/maincomponent/favourites"
            >
              <AiOutlineStar size="1.5rem" color={props.history.location.pathname === "/maincomponent/favourites" ? "#577eda" : "#9fa7a7"} />
            </Link>
          </div>
          <div className="Like__Icon">
            <Link
              to="/maincomponent/tagged"
            >
              <BsHash size="1.7rem" color={props.history.location.pathname === "/maincomponent/tagged" ? "#577eda" : "#9fa7a7"} />
            </Link>
          </div>
        </div>
        <div className="lower__Section">
          <div className="stories">
            <div className="StoryImageContainer">
              <img src={StoryPic1} alt="User_Story1" onClick={renderStories} />
            </div>
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleUpload}
              id="storyuploadimg"
            />
            <label htmlFor="storyuploadimg">
              {"  "}
              <div
                className="storyUploadIconContainer"
                onMouseEnter={hoverIconOne4}
                onMouseLeave={hoverIconTwo4}
              >
                {!hoveredStatus4 ? (
                  <MdFileUpload
                    size="1.5rem"
                    color={image ? "#577eda" : "#9fa7a7"}
                    className="storyUplaodIcons"
                  />
                ) : (
                  <MdFileUpload
                    size="1.5rem"
                    color="#577eda"
                    className="storyUplaodIcons"
                  />
                )}
              </div>
            </label>
            <div className="storyUploadIconDoneContainer">
              <button disabled={!image}>
                {image ? (
                  <MdDone
                    size="1.5rem"
                    color="#577eda"
                    className="storyUplaodDoneIcons"
                    onClick={upload}
                  />
                ) : null}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default withRouter(LeftSideBar);