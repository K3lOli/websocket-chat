// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6lc-16MbeoV8NigQjdDcWdoqJub4WvjM",
  authDomain: "chat-teste-34d8a.firebaseapp.com",
  projectId: "chat-teste-34d8a",
  storageBucket: "chat-teste-34d8a.appspot.com",
  messagingSenderId: "761831478892",
  appId: "1:761831478892:web:409cc63ab76ebfcd956a49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };