import React, { useState, useEffect } from "react";
import ProfilePlaceholder from "../../../../Images/download.jpg";
import { GrEmoji } from "react-icons/gr";
import "./timeLine.scss";
import { TiAttachment } from "react-icons/ti";
import IndividualPost from "./utils/IndividualPost";
import fire from "../../../Firebase/Firebase";
import { connect } from "react-redux";
import { check_User } from "./../../../../Redux/Actions/userActions";
import firebase from "firebase";
import PopUpStory from "../../../PopUpComp/PopUpStory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
toast.configure();
const Timeline = React.memo((props) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    let unsubscribe = fire
      .firestore()
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );
    return () => {
      unsubscribe();
    };
  }, [props.user]);

  const handleUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    console.log(image);
  };

  const upload = (e) => {
    e.preventDefault();
    setShowProgress(true);
    const storage = fire.storage();
    const uploadTask = storage.ref(`postimages/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(Math.floor(progress));
      },
      function (error) {
        console.log(error.message);
        setError(error);
        toast.warn("Some Error Occured!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
          console.log("File available at", url);
          setUrl(url);
          //saving post Data inside database
          fire.firestore().collection("posts").add({
            caption: caption,
            imageUrl: url,
            username: props.user?.user?.displayName,
            likes: 0,
            liked: false,
            favourite: false,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          setProgress(0);
          setCaption("");
          setImage(null);
          setShowProgress(false);
        });
        toast("Post Uploaded Successfully!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    );
    console.log(image?.name);
  };

  return (
    <div className="timeline__Wrapper">
      <div className="inner__Wrapper">
        {/*Add posting section ends */}
        <motion.div
          className="posting__Section"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="upperPortion">
            <div className="leftSide">
              <div className="userProfile__Pic">
                <img src={ProfilePlaceholder} alt="user_Profile_Pic" />
              </div>
              <div className="posting__Text">
                <textarea
                  placeholder="Type Something..."
                  onChange={(e) => setCaption(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="rightSide">
              <div className="uploadIcon">
                <input
                  type="file"
                  id="imguploads"
                  style={{ display: "none" }}
                  onChange={handleUpload}
                />
                <label htmlFor="imguploads">
                  {"  "}
                  <TiAttachment color="#9fa7a7" size="1.5rem" />
                </label>
              </div>
            </div>
          </div>
          <div className="lowerPortion">
            <button disabled={!image} onClick={upload}>
              Post
            </button>
            {showProgress ? (
              <progress value={progress} max="100" className="progressBar" />
            ) : null}
          </div>
        </motion.div>
        {posts?.map((post) => (
          <IndividualPost
            key={post.id}
            postId={post.id}
            post={post.post}
            username={props.user?.user?.displayName}
          />
        ))}
        <PopUpStory />
      </div>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    check_User: (user) => dispatch(check_User(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
