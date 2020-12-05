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
import { notifySuccess, notifyWarn } from "../util/util";
import fire from "../Firebase/Firebase";
import firebase from "firebase";

const LeftSideBar = React.memo((props) => {
  const { renderStories } = props;

  const [hoveredStatus, setHoveredStatus] = useState(false);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  //uploading stories
  const upload = (e) => {
    e.preventDefault();
    const storage = fire.storage();
    const uploadTask = storage.ref(`storyimages/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.floor(progress));
      },
      function (error) {
        setError(error);
        notifyWarn("Some Error Occured!");
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
          console.log("File available at", url);
          setUrl(url);
          //saving post Data inside database
          fire.firestore().collection("stories").add({
            storyUrl: url,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          setProgress(0);
          setImage(null);
        });
        notifySuccess("Story Uploaded Successfully!");
      }
    );
  };

  const hoverIconOne = () => {
    setHoveredStatus(true);
  };
  const hoverIconTwo = () => {
    setHoveredStatus(false);
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
            {/* is current route is /maincomponent/timeline then render blue icon otherwise render secondary colored icon */}
            <Link to="/home/timeline">
              <BsDroplet
                size="1.5rem"
                color={
                  props.history.location.pathname === "/home/timeline"
                    ? "#577eda"
                    : "#9fa7a7"
                }
              />
            </Link>
          </div>
          <div className="Favourites__Icon">
            {/* is current route is /maincomponent/favourites then render blue icon otherwise render secondary colored icon */}
            <Link to="/home/favourites">
              <AiOutlineStar
                size="1.5rem"
                color={
                  props.history.location.pathname === "/home/favourites"
                    ? "#577eda"
                    : "#9fa7a7"
                }
              />
            </Link>
          </div>
          <div className="Like__Icon">
            {/* is current route is /maincomponent/tagged then render blue icon otherwise render secondary colored icon */}
            <Link to="/home/tagged">
              <BsHash
                size="1.7rem"
                color={
                  props.history.location.pathname === "/home/tagged"
                    ? "#577eda"
                    : "#9fa7a7"
                }
              />
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
                onMouseEnter={hoverIconOne}
                onMouseLeave={hoverIconTwo}
              >
                {!hoveredStatus ? (
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
              {/* if image is uploaded then show done Btn */}
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
