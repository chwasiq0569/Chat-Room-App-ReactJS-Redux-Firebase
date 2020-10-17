import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAmAWs2kuxXo0QEe5fHn2YRMuc3cGCJpJc",
  authDomain: "social-networking-app-38daf.firebaseapp.com",
  databaseURL: "https://social-networking-app-38daf.firebaseio.com",
  projectId: "social-networking-app-38daf",
  storageBucket: "social-networking-app-38daf.appspot.com",
  messagingSenderId: "999223754159",
  appId: "1:999223754159:web:dff5a71de35f603cb1c35a",
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
