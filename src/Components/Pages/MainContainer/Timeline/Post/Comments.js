import React from "react";
import Comment from "./Comment";
import fire from "../../../../Firebase/Firebase";
import firebase from "firebase";
import { useState } from "react";
import uuid from "react-uuid";

const Comments = ({ comments, postId, username }) => {
  const [commentText, setCommentText] = useState("");
  const [showCommentsStatus, setShowCommentsStats] = useState(false);
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

  return (
    // if showCommentsStatus is false then render only last comment otherwise render all comments ,
    //showCommentsStatus will become true whenever we click on showMoreComments Btn
    <>
      {comments.map((comment, i) =>
        !showCommentsStatus ? (
          // here we are picking last comment where i is index
          i === comments.length - 1 ? (
            <Comment key={uuid()} comment={comment} />
          ) : null
        ) : (
          <Comment key={uuid()} comment={comment} />
        )
      )}
      {/* if comments are more then one only then show showMoreCommentsBtn  */}
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
    </>
  );
};

export default Comments;
