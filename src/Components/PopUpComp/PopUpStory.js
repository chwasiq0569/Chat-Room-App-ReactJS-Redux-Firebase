import React, { useEffect, useState } from "react";
import Stories from "react-insta-stories";
import "./popUpStory.scss";
import fire from "../Firebase/Firebase";
const PopUpStory = ({ renderStories, condition }) => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const unsubscribe = fire
      .firestore()
      .collection("stories")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setStories(snapshot.docs.map((doc) => doc.data().storyUrl));
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={condition ? "popUp__Container" : "hide"}>
      <div className="inner__Wrapper">
        <Stories stories={stories} />
        <button onClick={renderStories}>x</button>
      </div>
    </div>
  );
};

export default PopUpStory;
