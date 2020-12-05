import React, { useEffect, useState } from "react";
import "./App.scss";
import MainContainerComp from "./Components/Pages/MainContainer/MainContainerComp";
import ConversationPage from "./Components/Pages/ConversationPage/ConversationsPage";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthPage from "./Components/Pages/AuthPage/AuthPage";
import fire from "./Components/Firebase/Firebase";
import UpperHeader from "./Components/UpperHeader/UpperHeader";
import PopUpStory from "./Components/PopUpComp/PopUpStory";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { check_User } from "./Redux/Actions/userActions";

const App = (props) => {
  //will track popup is open or closed
  const [condition, setCondition] = useState(false);

  //will open and close our story popup
  const renderStories = (e) => {
    e.preventDefault();
    setCondition(!condition);
  };

  useEffect(() => {
    const unsubscribe = fire.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // setUser(authUser);
        props.check_User(authUser);
      } else {
        // setUser(null);
        props.check_User(authUser);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <motion.div className="App">
      {condition ? (
        <PopUpStory renderStories={renderStories} condition={condition} />
      ) : null}
      {props?.user?.user?.user === null ? null : <UpperHeader />}
      <div className="flexingNav">
        {/* <LeftSideBar /> */}
        <Switch>
          <Route
            path="/maincomponent"
            component={() => (
              <MainContainerComp
                condition={condition}
                renderStories={renderStories}
              />
            )}
          />
          <Route path="/popUpStory" component={PopUpStory} />
          <Route path="/conversations" component={ConversationPage} />
          <Route exact path="/" component={AuthPage} />
        </Switch>
      </div>
    </motion.div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    check_User: (user) => dispatch(check_User(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
