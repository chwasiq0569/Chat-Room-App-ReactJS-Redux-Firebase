import React from "react";
import ProfilePlaceholder from "../../../../../Images/download.jpg";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

const UserProfileSection = ({ post, upload, favourites }) => {
  return (
    <div className="post__userProfile">
      <div className="innerLeft">
        <div className="profilePic">
          <img src={ProfilePlaceholder} alt="user_Profile_Pic" />
        </div>
        <div className="userName">
          <p>{post.username}</p>
        </div>
      </div>
      {!favourites ? (
        <div disabled={post.favourite} className="innerRight" onClick={upload}>
          {!post.favourite ? (
            <AiOutlineStar size="1.3rem" color="#9fa7a7" />
          ) : (
            <AiFillStar size="1.3rem" color="#9fa7a7" />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default UserProfileSection;
