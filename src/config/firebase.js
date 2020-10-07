import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyD_DYoBbCIK-uLzcRjuGdgGGi5OVwC8uEM",
    authDomain: "instagram-clone-e15dc.firebaseapp.com",
    databaseURL: "https://instagram-clone-e15dc.firebaseio.com",
    projectId: "instagram-clone-e15dc",
    storageBucket: "instagram-clone-e15dc.appspot.com",
    messagingSenderId: "324971247024",
    appId: "1:324971247024:web:5c8e6b880305ec83655275",
    measurementId: "G-6P962JFN39"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // initialize firestore database
const db = firebase.firestore();

  // user authentication
const auth = firebase.auth();

  //  data storage
const storage = firebase.storage();

export {db, auth, storage};