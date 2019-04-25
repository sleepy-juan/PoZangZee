/*
    Database.js
    - a module to handle firebase
*/

/********************************************************************************/
// Database.js USAGE
// 
// initDatabase(): must call in index.js
// 
// sendMail(email): send email
//      user_from, [user_to], timestamp_sent, [timestamp_needtoreply], timestamp_open, subject, content
//      [category], state, 
// getOutbox(user, func): get mails in outbox of user and run func with the mails
// getUnreadOutbox(user, func): get unread mails in outbox of user and run func with the mails
// getInbox(user, func): get mails in inbox of user and run func with the mails
// getUnreadInbox(user, func): get unread mails in outbox of user and run func with the mails
//
// setMailRead(email_id): set email as read
// setMailUnread(email_id): set email as unread
// setMailCategory(email_id, category): set email category
// setMailState(email_id, state): set email state
/********************************************************************************/

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
export function sendMail(email){
    // denormalize the db for performance

    var parsed_email = {
        ...email,
        timestamp_sent: email.timestamp_sent || Date.now(),
        timestamp_needtoreply: email.timestamp_needtoreply || [],
        timestamp_open: null,
        subject: email.subject || new Date().toLocaleString(),
        content: email.content || '',
        category: email.category || [],
        state: email.category || 'sent',
    }
    
    db.collection('mailbox').add(parsed_email);
}

// function getOutbox: user, func -> void
export function getOutbox(user, func){
    db.collection('mailbox').get().then(snapshot=>{
        var mails = []
        snapshot.forEach(mail => {
            mail = mail.data();
            if(mail.user_from === user){
                mails.push(mail);
            }
        });

        // call
        func(mails);
    });
}

// function getUnreadOutbox: user, func -> void
export function getUnreadOutbox(user, func){
    db.collection('mailbox').get().then(snapshot=>{
        var mails = []
        snapshot.forEach(mail => {
            mail = mail.data();
            if(mail.user_from === user && mail.timestamp_open === null){
                mails.push(mail);
            }
        });

        // call
        func(mails);
    });
}

// function getInbox: user, func -> void
export function getInbox(user, func){
    db.collection('mailbox').get().then(snapshot=>{
        var mails = []
        snapshot.forEach(mail => {
            mail = mail.data();
            if(mail.user_to.includes(user)){
                mails.push(mail);
            }
        });

        // call
        func(mails);
    });
}

// function getUnreadInbox: user, func -> void
export function getUnreadInbox(user, func){
    db.collection('mailbox').get().then(snapshot=>{
        var mails = []
        snapshot.forEach(mail => {
            mail = mail.data();
            if(mail.user_to.includes(user) && mail.timestamp_open === null){
                mails.push(mail);
            }
        });

        // call
        func(mails);
    });
}

// function setMailRead: email_id -> void
export function setMailRead(email_id){
    db.collection('mailbox').doc(email_id).update({
        timestamp_open: Date.now()
    })
}

// function setMailUnread: email_id -> void
export function setMailUnread(email_id){
    db.collection('mailbox').doc(email_id).update({
        timestamp_open: null
    })
}

// function setMailCategory: email_id, category -> void
export function setMailCategory(email_id, category){
    db.collection('mailbox').doc(email_id).update({
        category
    })
}

// function setMailState: email_id, state -> void
export function setMailState(email_id, state){
    db.collection('mailbox').doc(email_id).update({
        state
    })
}