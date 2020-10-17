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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

toast.configure();
const IndividualPost = (props) => {
  const { post, postId, username } = props;
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [postsArr, setPostArr] = useState([]);
  const [showCommentsStatus, setShowCommentsStats] = useState(false);
  const [liked, setLiked] = useState(false);

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
    toast("Post added To Saved!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  useEffect(() => {
    let unsubscribe = fire
      .firestore()
      .collection("posts")
      .onSnapshot((snapshot) =>
        setPostArr(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        )
      );
    return () => {
      unsubscribe();
    };
  }, []);

  let requiredPost = postsArr.filter((posts) => posts.id === postId);

  const addComment = (e) => {
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
          liked: true,
          likes: requiredPost[0]?.post?.likes + 1,
        });
      setLiked(true);
    } else if (liked) {
      fire
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          liked: false,
          likes: requiredPost[0]?.post?.likes - 1,
        });
      setLiked(false);
    }
  };

  useEffect(() => {
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
