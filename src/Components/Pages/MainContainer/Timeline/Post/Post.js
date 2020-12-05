import React, { useEffect, useState } from "react";
import fire from "../../../../Firebase/Firebase";
import firebase from "firebase";
// import { TiVendorAndroid } from "react-icons/ti";
import ProfilePlaceholder from "../../../../../Images/download.jpg";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { notifySuccess } from "../../../../util/util";
import UserProfileSection from "./UserProfileSection";
import ReactionSection from "./ReactionSection";
import Comments from "./Comments";

const Post = (props) => {
  //post prop contain individual post and postId contains id of individualpost and username contains username of loggedIn User
  const { post, postId, username } = props;
  //comments [] state will store all the comments
  const [comments, setComments] = useState([]);
  //commentText state contains comment input
  //postsArr state contains list of posts
  const [postsArr, setPostArr] = useState([]);
  //we will render comments by checking number of comments if comments are more we will hide them on clicking Btn we will be able to see hided Comments (showCommentsStatus) will track all this scnerio
  //liked state will tells us that post is liked or not
  const [liked, setLiked] = useState(false);
  //this function will we called when we click on favourite Btn of particular post on which that post will be uploaded to backend as favourite

  //on clicking favourite Btn post will be added to favourites
  const upload = (post, postId, e) => {
    e.preventDefault();
    console.log(postId);
    if (!post.favourite) {
      fire.firestore().collection("posts").doc(postId).update({
        favourite: true,
      });
      fire.firestore().collection("favouritePosts").add({
        post: post,
      });
    }
    notifySuccess("Post Added to Favourites!");
  };

  const getDataFromBackend = () => {
    return fire
      .firestore()
      .collection("posts")
      .onSnapshot((snapshot) =>
        setPostArr(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        )
      );
  };

  useEffect(() => {
    //getting all the posts from backend
    let unsubscribe = getDataFromBackend();
    return () => {
      //cancelling subscription on Unmount
      unsubscribe();
    };
  }, []);

  //return the post whose id is equals to id of individual Post
  let requiredPost = postsArr.filter((posts) => posts.id === postId);

  const handleLikes = (e) => {
    e.preventDefault();
    if (!liked) {
      fire
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          //if post is not liked then on cliking like Btn we will update like status to true and will increment number of likes
          liked: true,
          likes: requiredPost[0]?.post?.likes + 1,
        });
      //if not liked on clicking Like Btn post will be disliked
      setLiked(true);
    } else if (liked) {
      fire
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          //if post is likedt hen on cliking like Btn we will update like status to false and will decrement number of likes
          liked: false,
          likes: requiredPost[0]?.post?.likes - 1,
        });
      //if liked on clicking Like Btn post will be disliked
      setLiked(false);
    }
  };

  useEffect(() => {
    //getting comments from backend
    let unsubscribe;
    if (postId) {
      unsubscribe = fire
        .firestore()
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setComments(
            snapshot.docs.map((doc) => ({ id: doc.id, comment: doc.data() }))
          )
        );
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  return (
    <motion.div
      className="postsCollection"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5, type: "tween" }}
    >
      <UserProfileSection
        post={post}
        upload={(e) => upload(post, postId, e)}
        favourites={false}
      />
      <div className="post__Caption">{post.caption}</div>
      <div className="postContent">
        <img src={post.imageUrl} alt="user_Post_Image" />
      </div>
      <ReactionSection
        liked={liked}
        handleLikes={handleLikes}
        post={post}
        comments={comments}
      />
      <Comments comments={comments} postId={postId} username={username} />
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Post);
