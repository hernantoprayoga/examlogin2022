import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBgWfmsFQs13-_rgDMgMdCT6QdhvgxxEVE",
  authDomain: "examnew-25921.firebaseapp.com",
  projectId: "examnew-25921",
  storageBucket: "examnew-25921.appspot.com",
  messagingSenderId: "894998629941",
  appId: "1:894998629941:web:31650a9becdd56c9bd2b7c",
};

// Initialize Firebase
const init = firebase.initializeApp(firebaseConfig);
export const firebaseAuthentication = init.auth();
