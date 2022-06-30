import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDa2pV8Ct34q84wK_2DrS2ugSE8olf5I8U",
  authDomain: "app-auth-a6a24.firebaseapp.com",
  databaseURL: "https://app-auth-a6a24-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "app-auth-a6a24",
  storageBucket: "app-auth-a6a24.appspot.com",
  messagingSenderId: "545331682687",
  appId: "1:545331682687:web:a42b3e9b29b81f52a74e4a"
};

  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();