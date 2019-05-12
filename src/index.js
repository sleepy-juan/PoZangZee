import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase';
import $ from 'jquery';
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

//
$(document).on('click', '.stop-propagation', function(e){
    e.stopPropagation();
});
$('.stop-propagation').on('click', function(e){
    e.stopPropagation();
});

// initialize react
ReactDOM.render(<App />, document.getElementById('root'));