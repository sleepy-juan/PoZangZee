/*
    Database.js
    - a module to handle firebase
*/

import firebase from 'firebase';
require("firebase/firestore");  // for side-effects

var db; // db global variable
// initialized after initDatabase called

// function initDatabase: void -> void
// - initialize firebase and set db variable
export function initDatabase(){
    // Note that the credential is open since this is only testing prototype
    var config = {
        apiKey: "AIzaSyC7D_kFEwf7D6oLDT6mtKZHG77xhC7hw-8",
        authDomain: "pozangzee.firebaseapp.com",
        databaseURL: "https://pozangzee.firebaseio.com",
        projectId: "pozangzee",
        storageBucket: "pozangzee.appspot.com",
        messagingSenderId: "13004694773"
    };
    firebase.initializeApp(config);

    db = firebase.firestore();
}

// function sendMail: email -> void
// 
// email : {
//      user_from, [user_to], 
//      timestamp_sent, [timestamp_needtoreply], timestamp_open,
//      subject, content,
// }
export function sendMail(from, to, subject, content){
    var mail = {
        from,
        to,
        subject,
        content,
        sent: Date.now(),
        replyBy: null,
        category: null,
        status: null,
    }

    db.collection('inbox').add(mail);
    db.collection('outbox').add(mail);
}

export function getMails(user, what){
    db.collection('inbox').get().then(snapshot => {
        var mails = [];
        snapshot.forEach(mail => {
            var id = mail.id
            mail = mail.data();

            if(mail.to === user && mail.category !== 'Trash'){
                mail.sent = new Date(mail.sent).toLocaleString();
                mail.id = id;

                mails.push(mail);
            }
        })
		console.log(mails)
        what(mails);
    })
}

export function getSentMails(user, what){
    db.collection('outbox').get().then(snapshot => {
        var mails = [];
        snapshot.forEach(mail => {
            var id = mail.id
            mail = mail.data();

            if(mail.from === user && mail.category !== 'Trash'){
                mail.sent = new Date(mail.sent).toLocaleString();
                mail.id = id;

                mails.push(mail);
            }
        })
        what(mails);
    })
}

export function setCategory(id, category){
    db.collection('inbox').doc(id).update({
        category
    })
}

export function getTrashMails(user, what){
    db.collection('inbox').get().then(snapshot => {
        var mails = [];
        snapshot.forEach(mail => {
            var id = mail.id
            mail = mail.data();

            if(mail.to === user && mail.category === 'Trash'){
                mail.sent = new Date(mail.sent).toLocaleString();
                mail.id = id;

                mails.push(mail);
            }
        })
        what(mails);
    })
}

export function setReplyBy(id, date){
    console.log(id, date)
    
    db.collection('inbox').doc(id).update({
        replyBy: date
    })
}