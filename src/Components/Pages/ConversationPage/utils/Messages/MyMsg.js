import React from "react";
import MyImage from "../../../../../Images/download.jpg";
import { motion } from "framer-motion";

const MyMsg = ({ msg }) => {
  return (
    <motion.div
      className="myMessages"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="message">
        <p>{msg.message}</p>
      </div>
      <div className="myImage">
        <img src={MyImage} alt="myProfilePic" />
      </div>
    </motion.div>
  );
};

export default MyMsg;
