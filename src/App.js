import React, { useEffect, useState } from "react";
import "./App.scss";
import MainContainerComp from "./Components/Pages/MainContainer/MainContainerComp";
import ConversationPage from "./Components/Pages/ConversationPage/ConversationsPage";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthPage from "./Components/Pages/AuthPage/AuthPage";
import fire from "./Components/Firebase/Firebase";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import UpperHeader from "./Components/UpperHeader/UpperHeader";
import PopUpStory from "./Components/PopUpComp/PopUpStory";
import { connect } from "react-redux";
import firebase from "firebase";
import Favourites from "./Components/Pages/MainContainer/Favourites/Favourites";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
toast.configure();

function App() {
  const [condition, setCondition] = useState(false);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);

  console.log("user: ", user);
  const renderStories = (e) => {
    e.preventDefault();
    setCondition(!condition);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log(image);
    }
  };

  const upload = (e) => {
    e.preventDefault();
    const storage = fire.storage();
    const uploadTask = storage.ref(`storyimages/${image.name}`).put(image);
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
          fire.firestore().collection("stories").add({
            storyUrl: url,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          setProgress(0);
          setImage(null);
        });
        toast("Story Uploaded Successfully!", {
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
  };

  useEffect(() => {
    const unsubscribe = fire.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <motion.div className="App">
      {condition ? (
        <PopUpStory renderStories={renderStories} condition={condition} />
      ) : null}
      <Provider store={store}>
        {user === null ? null : <UpperHeader />}
        <div className="flexingNav">
          {/* <LeftSideBar /> */}
          <Switch>
            <Route
              path="/maincomponent"
              component={() => (
                <MainContainerComp
                  condition={condition}
                  renderStories={renderStories}
                  upload={upload}
                  handleUpload={handleUpload}
                  image={image}
                />
              )}
            />

            <Route path="/popUpStory" component={PopUpStory} />
            <Route path="/conversations" component={ConversationPage} />
            <Route exact path="/" component={AuthPage} />
            {/* {user ? <Redirect from="/timeline" to="/" /> : <Redirect to="/" />} */}
            {/* <MainContainerComp /> */}
            {/* <ConversationPage /> */}
          </Switch>
        </div>
      </Provider>
    </motion.div>
  );
}

export default App;
