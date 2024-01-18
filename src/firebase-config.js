import * as firebase from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
        apiKey: "AIzaSyBhGIuvheaDBUsxdrvFyM_Qi-_mCJc4PHk",
        authDomain: "rumbrary-fdcae.firebaseapp.com",
        projectId: "rumbrary-fdcae",
        storageBucket: "rumbrary-fdcae.appspot.com",
        messagingSenderId: "924731702740",
        appId: "1:924731702740:web:549581dbc460baf0a26a41"
      };


const app = firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);


export {db} 