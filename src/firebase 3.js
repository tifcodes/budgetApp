import firebase from "firebase/app"
import "firebase/database"
import "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjI3Akd0ByoWLLk4jhRqiC5S9ROEQPKfs",
  authDomain: "budget-app-6f2e9.firebaseapp.com",
  databaseURL: "https://budget-app-6f2e9.firebaseio.com",
  projectId: "budget-app-6f2e9",
  storageBucket: "budget-app-6f2e9.appspot.com",
  messagingSenderId: "472155372575",
  appId: "1:472155372575:web:b34d0ba760d2fa7c22e92a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dbRef = firebase.database().ref();

export default dbRef;