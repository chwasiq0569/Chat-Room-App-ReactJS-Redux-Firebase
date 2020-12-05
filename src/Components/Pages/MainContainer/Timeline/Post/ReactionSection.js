import React from "react";
import { FiHeart } from "react-icons/fi";
import { GoComment } from "react-icons/go";
import { BsFillHeartFill } from "react-icons/bs";

const ReactionSection = ({ liked, handleLikes, post, comments }) => {
  return (
    <div className="Reaction__Section">
      <div className="LikesSection">
        {/* onCLicking heartIcon handleLikes function will be called Post will be liked  */}
        <div className="likeBtn" onClick={handleLikes}>
          {/* !liked means if post is not liked then show Unfilled Heart and if liked then show filled Heart */}
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
  );
};

export default ReactionSection;
