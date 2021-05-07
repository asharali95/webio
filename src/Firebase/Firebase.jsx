import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBtgSd5NdIzav_TIKpXAF5RcLSPeYK39EU",
  authDomain: "webio-app.firebaseapp.com",
  projectId: "webio-app",
  storageBucket: "webio-app.appspot.com",
  messagingSenderId: "478631337792",
  appId: "1:478631337792:web:a9bb170362ac311598e4a5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export var firestore = firebase.firestore();

export default firebase;
