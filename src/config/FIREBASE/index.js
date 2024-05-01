import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database"

firebase.initializeApp({
    apiKey: "AIzaSyBmSh1zhP9ciS3ssIAuKfRx8oJA7El4BUU",
    authDomain: "noteapp-2f59e.firebaseapp.com",
    projectId: "noteapp-2f59e",
    storageBucket: "noteapp-2f59e.appspot.com",
    messagingSenderId: "737672778110",
    appId: "1:737672778110:web:c074ec2e443b80c520232f"
})

const FIREBASE = firebase;

export default FIREBASE;
