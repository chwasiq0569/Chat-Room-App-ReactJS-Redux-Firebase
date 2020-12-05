import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { GoComment } from "react-icons/go";
import ProfilePlaceholder from "../../../../../Images/download.jpg";
import fire from "../../../../Firebase/Firebase";
import firebase from "firebase";
import { BsFillHeartFill } from "react-icons/bs";
// import { TiVendorAndroid } from "react-icons/ti";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { notifySuccess } from "./../../../../util/util";

const IndividualPost = (props) => {
  //post prop contain individual post and postId contains id of individualpost and username contains username of loggedIn User
  const { post, postId, username } = props;
  //comments [] state will store all the comments
  const [comments, setComments] = useState([]);
  //commentText state contains comment input
  const [commentText, setCommentText] = useState("");
  //postsArr state contains list of posts
  const [postsArr, setPostArr] = useState([]);
  //we will render comments by checking number of comments if comments are more we will hide them on clicking Btn we will be able to see hided Comments (showCommentsStatus) will track all this scnerio
  const [showCommentsStatus, setShowCommentsStats] = useState(false);
  //liked state will tells us that post is liked or not
  const [liked, setLiked] = useState(false);

  //this function will we called when we click on favourite Btn of particular post on which that post will be uploaded to backend as favourite
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

  const addComment = (e) => {
    //this function will upload comments to backend
    e.preventDefault();
    fire
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        comment: commentText,
        username: username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

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
      <div className="post__userProfile">
        <div className="innerLeft">
          <div className="profilePic">
            <img src={ProfilePlaceholder} alt="user_Profile_Pic" />
          </div>
          <div className="userName">
            <p>{post.username}</p>
          </div>
        </div>
        <div
          disabled={post.favourite}
          className="innerRight"
          onClick={(e) => upload(post, postId, e)}
        >
          {!post.favourite ? (
            <AiOutlineStar size="1.3rem" color="#9fa7a7" />
          ) : (
            <AiFillStar size="1.3rem" color="#9fa7a7" />
          )}
        </div>
      </div>
      <div className="post__Caption">{post.caption}</div>
      <div className="postContent">
        <img src={post.imageUrl} alt="user_Post_Image" />
      </div>
      <div className="Reaction__Section">
        <div className="LikesSection">
          <div className="likeBtn" onClick={handleLikes}>
            {!liked ? (
              <FiHeart color="#9fa7a7" size="1.1rem" />
            ) : (
              <BsFillHeartFill color="red" size="1.1rem" />
            )}
          </div>
          <div className="likesCount">
            <span>{post.likes}</span>
          </div>
        </div>
        <div className="commentsSection">
          <div className="commentBtn">
            <GoComment color="#9fa7a7" size="1.1rem" />
          </div>
          <div className="commentsCount">
            <span>{comments.length}</span>
          </div>
        </div>
      </div>
      {comments.map((comment, i) =>
        !showCommentsStatus ? (
          i === comments.length - 1 ? (
            <div className="post__Comments" key={comment.id}>
              <div className="profilePic">
                <img src={ProfilePlaceholder} alt="user_Profile_Pic" />
              </div>
              <div className="userName">
                <p>{comment?.comment?.username}</p>
              </div>
              <div className="individualComment">
                <p>{comment?.comment?.comment}</p>
              </div>
            </div>
          ) : null
        ) : (
          <div className="post__Comments" key={comment.id}>
            <div className="profilePic">
              <img src={ProfilePlaceholder} alt="user_Profile_Pic" />
            </div>
            <div className="userName">
              <p>{comment?.comment?.username}</p>
            </div>
            <div className="individualComment">
              <p>{comment?.comment?.comment}</p>
            </div>
          </div>
        )
      )}
      {comments.length > 1 ? (
        <div className="viewMoreComments__Section">
          <p onClick={() => setShowCommentsStats(!showCommentsStatus)}>
            {!showCommentsStatus ? "View More Comments" : "Hide Comments"}
          </p>
        </div>
      ) : null}
      <div className="commentWritingSection">
        <textarea
          placeholder="Add Comment..."
          className="commentText"
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <button disabled={commentText ? false : true} onClick={addComment}>
          Post
        </button>
      </div>
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(IndividualPost);
