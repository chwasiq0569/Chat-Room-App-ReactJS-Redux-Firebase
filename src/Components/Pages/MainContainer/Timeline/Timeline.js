import React, { useState, useEffect } from "react";
import "./timeLine.scss";
import Post from "./Post/Post";
import fire from "../../../Firebase/Firebase";
import { connect } from "react-redux";
import firebase from "firebase";
import PopUpStory from "../../../PopUpComp/PopUpStory";
import AddPosts from "./AddPosts";
import { notifyWarn, notifySuccess } from "../../../util/util";

const Timeline = React.memo((props) => {
  //image state will store image to be uploaded
  const [image, setImage] = useState(null);
  //progress state will keep track of how much file is uploaded in percentage
  const [progress, setProgress] = useState(0);
  //error state will store error if any error occured during upload
  const [error, setError] = useState("");
  //url state will store url of image that is uplaod on firebase storage we need thisurl to show images on Timeline
  const [url, setUrl] = useState("");
  //caption state will store caption of post
  const [caption, setCaption] = useState("");
  //posts state is an array that will store all the posts
  const [posts, setPosts] = useState([]);
  //showProgress state will tell us wether to show progress bar or not if showProgress is false we will hide progress bar
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    //this code is getting data from backend firebase in descending order by timestamps
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
  }, []);

  //on clicking post button this function will be called
  const upload = (e) => {
    e.preventDefault();
    setShowProgress(true);
    //accessing firebase storage
    const storage = fire.storage();
    const uploadTask = storage.ref(`postimages/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        //setting progress
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.floor(progress));
      },
      function (error) {
        setError(error);
        notifyWarn("Some Error Occured!");
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
          console.log("File available at", url);
          //our post Url (image Url that us uploaded)
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
          //after uploading setting Progress state to 0
          setProgress(0);
          //after uploading setting Caption state to ""
          setCaption("");
          //after uploading setting Caption state to ""
          setImage(null);
          //after uploading setting ShowProgress state to false
          //after uploading we want our progress bar to hide
          setShowProgress(false);
        });
        notifySuccess("Post Uploaded Successfully!");
      }
    );
  };

  return (
    <div className="timeline__Wrapper">
      <div className="inner__Wrapper">
        {/*Add posting section ends */}
        <AddPosts
          setCaption={setCaption}
          progress={progress}
          image={image}
          upload={upload}
          showProgress={showProgress}
          setImage={setImage}
        />
        {posts?.map((post) => (
          <Post
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

export default connect(mapStateToProps)(Timeline);
