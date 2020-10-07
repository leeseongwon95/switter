import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCZimjTi3kBzhrCK6KT4QNrmA8Y8r4ph-E",
  authDomain: "switter-224bd.firebaseapp.com",
  databaseURL: "https://switter-224bd.firebaseio.com",
  projectId: "switter-224bd",
  storageBucket: "switter-224bd.appspot.com",
  messagingSenderId: "534316359847",
  appId: "1:534316359847:web:3ac0af4e3ec4bb20d93b82",
};

export default firebase.initializeApp(firebaseConfig);
