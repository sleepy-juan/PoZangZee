import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase';
require("firebase/firestore");  // for side-effects

// initialize firebase
var config = {
    apiKey: "AIzaSyC7D_kFEwf7D6oLDT6mtKZHG77xhC7hw-8",
    authDomain: "pozangzee.firebaseapp.com",
    databaseURL: "https://pozangzee.firebaseio.com",
    projectId: "pozangzee",
    storageBucket: "pozangzee.appspot.com",
    messagingSenderId: "13004694773"
};
firebase.initializeApp(config);

// initialize react
ReactDOM.render(<App />, document.getElementById('root'));