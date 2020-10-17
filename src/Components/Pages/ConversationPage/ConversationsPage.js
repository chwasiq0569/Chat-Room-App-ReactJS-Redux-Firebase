import React, { useState, useEffect } from "react";
import IndividualUserConvo from "./utils/IndividualUserConvo";
import WriteAndSend from "./utils/rightAndSendComp/WriteAndSend";
import OthersMsg from "./utils/Messages/OthersMsg";
import MyMsg from "./utils/Messages/MyMsg";
import "./conversations.scss";
import LeftSideBar from "./../../LeftSideBar/LeftSideBar";
import fire from "../../Firebase/Firebase";
import { connect } from "react-redux";
import firebase from "firebase";
import { motion } from "framer-motion";

const MainContainerComp = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  const sendMessage = (e) => {
    e.preventDefault();
    fire.firestore().collection("messages").add({
      username: props.user?.user?.displayName,
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage("");
  };

  useEffect(() => {
    fire
      .firestore()
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, msg: doc.data() }))
        )
      );
    var myDiv = document.getElementById("myDiv");
    myDiv.scrollTop = myDiv.scrollHeight;
  }, []);

  return (
    <motion.div
      className="converstionComp__Wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1.5 }}
    >
      <div className="inner__Wrapper">
        <div className="leftSide__Comp">{<LeftSideBar />}</div>
        <div className="rightSide__Wrapper">
          <div className="upperSection">
            <IndividualUserConvo />
          </div>
          <div className="lowerSection" id="myDiv">
            {" "}
            <div className="messagesContainer">
              {messages.map((msg) =>
                msg?.msg.username === props.user?.user?.displayName ? (
                  <MyMsg msg={msg?.msg} key={msg?.id} />
                ) : (
                  <OthersMsg msg={msg?.msg} key={msg?.id} />
                )
              )}
            </div>
          </div>
          <div className="lastSection">
            <WriteAndSend
              sendMessage={sendMessage}
              onChange={onChange}
              message={message}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(MainContainerComp);
