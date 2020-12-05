import React, { useState, useEffect } from "react";
import "../Timeline/timeLine.scss";
import fire from "../../../Firebase/Firebase";
import "./favourites.scss";
import { motion } from "framer-motion";
import UserProfileSection from "../Timeline/Post/UserProfileSection";

const Favourites = () => {
  //contain favourties Posts
  const [posts, setPosts] = useState([]);
  const getPostsFromBackend = () => {
    return fire
      .firestore()
      .collection("favouritePosts")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );
  };

  useEffect(() => {
    //getting favourite Posts from backend
    let unsubscribe = getPostsFromBackend();
    return () => {
      unsubscribe();
    };
  }, []);

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
          <UserProfileSection
            post={post?.post?.post}
            upload={() => "hello"}
            favourites={true}
          />
          <div className="post__Caption">{post?.post?.post?.caption}</div>
          <div className="postContent">
            <img src={post?.post?.post?.imageUrl} alt="user_Post_Image" />
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default Favourites;
