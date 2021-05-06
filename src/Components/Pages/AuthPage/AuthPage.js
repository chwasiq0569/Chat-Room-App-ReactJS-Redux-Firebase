import React, { useState, useEffect } from "react";
import "./authpage.scss";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import fire from "../../Firebase/Firebase";
import { check_User } from "./../../../Redux/Actions/userActions";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import Input from "./../../util/Input";
import Icons from "./Icons";
import { FiActivity } from "react-icons/fi";

const AuthPage = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("dummyUser@gmail.com");
  const [password, setPassword] = useState("dummyUser@gmail.com");
  const [register, setRegister] = useState(false);
  const [fireErrors, setFireErrors] = useState("");
  const [user, setUser] = useState(null);

  const onRegister = (e) => {
    e.preventDefault();
    setRegister(!register);
    setUsername("");
    setEmail("");
    setPassword("");
    setFireErrors("");
  };

  useEffect(() => {
    const unsubscribe = fire.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        if (user) {
          props.check_User(user);
          props.history.push("/home/timeline");
        }
      } else {
        setUser(authUser);
        if (user === null) {
          props.check_User(authUser);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const signIn = (e) => {
    e.preventDefault();
    fetch('api/signin',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then((res) => res.json()).then((data) => console.log(data))
    // fire
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then((result) => {
    //     console.log("result: ", result.user.uid);
    //     console.log("Successfully Logged In");
    //   })
    //   .catch((error) => {
    //     setFireErrors(error.message);
    //   });
  };

  const signUp = (e) => {
    e.preventDefault();
    fetch('api/signup',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password
      })
    }).then((res) => res.json()).then((data) => console.log(data))
    // fire
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((result) => {
    //     return result.user.updateProfile({
    //       displayName: username,
    //     });
    //   })
    //   .catch(function (error) {
    //     setFireErrors(error.message);
    //   });
  };

  return (
    <div className="converstionComp__Wrapper">
      <div className="inner__Wrapper">
        <div className="leftSide">
          <motion.div
            className="authBox"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="brandIcon">
              <FiActivity size="3rem" color="#2757c7" />
            </div>
            <h3 className="fireErrors">{fireErrors}</h3>
            <div className="userInfo">
              <form>
                <div className="usernameData">
                  <AiOutlineUser color="#577eda" size="1.2rem" />
                  {register ? (
                    <Input
                      className="usernameInput"
                      name="username"
                      type="text"
                      placeholder="Enter Username"
                      func={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                  ) : null}
                  {/* <input
                    className={register ? "usernameInput" : "hide"}
                    name="username"
                    type="text"
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  /> */}
                </div>
                <div className="emailData">
                  <AiOutlineMail color="#577eda" size="1.2rem" />
                  <Input
                    className="usernameInput"
                    name="email"
                    type="email"
                    placeholder="Enter Email Address"
                    func={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  {/* <input
                    className="usernameInput"
                    name="email"
                    type="email"
                    placeholder="Enter Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  /> */}
                </div>
                <div className="passwordData">
                  <RiLockPasswordLine color="#577eda" size="1.2rem" />
                  <Input
                    className="usernameInput"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    func={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  {/* <input
                    className="usernameInput"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  /> */}
                </div>
                <button
                  onClick={register ? signUp : signIn}
                  className="loginBtn"
                >
                  {register ? <span>Sign Up</span> : <span>Log In</span>}
                </button>
                <button className="registernewaccBtn" onClick={onRegister}>
                  {register ? <span>Sign In</span> : <span>Sign Up</span>}
                </button>
              </form>
            </div>
            <Icons />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
