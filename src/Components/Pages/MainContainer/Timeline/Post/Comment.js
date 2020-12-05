import React from "react";
import ProfilePlaceholder from "../../../../../Images/download.jpg";

const Comment = ({ comment }) => {
  return (
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
  );
};

export default Comment;
