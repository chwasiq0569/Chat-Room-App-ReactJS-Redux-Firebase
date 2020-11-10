import React, { useState, useEffect } from "react";
import "../Timeline/timeLine.scss";
import fire from "../../../Firebase/Firebase";
import { connect } from "react-redux";
import IndividualPost from "./../Timeline/utils/IndividualPost";
import ProfilePlaceholderImg from "../../../../Images/download.jpg";
import "./favourites.scss";
import { motion } from "framer-motion";

const Favourites = (props) => {
  const [posts, setPosts] = useState([]);
  console.log("Favourites");

  useEffect(() => {
    let unsubscribe = fire
      .firestore()
      .collection("favouritePosts")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map(( doc ) => ({ id: doc.id, post: doc.data() })))
      );
    return () => {
      unsubscribe();
    };
  }, []);
  console.log(posts[0]?.post?.post.imageUrl);

  return (
    <motion.div
      className="favourites__Wrapper"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <h1>Favourites</h1>
      {posts.map((post) => (
        <div className="postsCollection" key={post.id}>
          <div className="post__userProfile">
            <div className="innerLeft">
              <div className="profilePic">
                <img src={ProfilePlaceholderImg} alt="user_Profile_Pic" />
              </div>
              <div className="userName">
                <p>{post?.post?.post?.username}</p>
              </div>
            </div>
          </div>
          <div className="post__Caption">{post?.post?.post?.caption}</div>
          <div className="postContent">
            <img src={post?.post?.post?.imageUrl} alt="user_Post_Image" />
          </div>
        </div>
      ))}
    </motion.div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Favourites);
