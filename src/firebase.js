import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx8D5xRcghmwo1xjs0ezP--8PCHAch23w",
  authDomain: "motocandomundoafora-aed8d.firebaseapp.com",
  projectId: "motocandomundoafora-aed8d",
  storageBucket: "motocandomundoafora-aed8d.appspot.com",
  messagingSenderId: "952991337375",
  appId: "1:952991337375:web:f7cbeac4dfca0b37488baa",
  measurementId: "G-TWC2L76B52"
};

export const firebaseImpl = firebase.initializeApp(firebaseConfig);
export const firebaseDatabase = firebase.database();
export const firestore = firebase.firestore();

export default firebase;
