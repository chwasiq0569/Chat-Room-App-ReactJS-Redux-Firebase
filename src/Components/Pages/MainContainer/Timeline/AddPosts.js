import React from "react";
import ProfilePlaceholder from "../../../../Images/download.jpg";
import { TiAttachment } from "react-icons/ti";
import { motion } from "framer-motion";

const AddPosts = ({
  setCaption,
  progress,
  image,
  upload,
  showProgress,
  setImage,
}) => {
  const handleUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  return (
    <motion.div
      className="posting__Section"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <div className="upperPortion">
        <div className="leftSide">
          <div className="userProfile__Pic">
            <img src={ProfilePlaceholder} alt="user_Profile_Pic" />
          </div>
          <div className="posting__Text">
            <textarea
              placeholder="Type Something..."
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="rightSide">
          <div className="uploadIcon">
            <input
              type="file"
              id="imguploads"
              style={{ display: "none" }}
              onChange={handleUpload}
            />
            <label htmlFor="imguploads">
              {"  "}
              <TiAttachment color="#9fa7a7" size="1.5rem" />
            </label>
          </div>
        </div>
      </div>
      <div className="lowerPortion">
        <button disabled={!image} onClick={upload}>
          Post
        </button>
        {showProgress ? (
          <progress value={progress} max="100" className="progressBar" />
        ) : null}
      </div>
    </motion.div>
  );
};

export default AddPosts;
