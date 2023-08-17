import firebase from 'firebase';

const firebaseApp = firebase.initializeApp( {
    apiKey: "AIzaSyC84_Nmmxr3LPJba5BdvsPaUX782cAN2lQ",
    authDomain: "edivandocalcados-6fb1f.firebaseapp.com",
    projectId: "edivandocalcados-6fb1f",
    storageBucket: "edivandocalcados-6fb1f.appspot.com",
    messagingSenderId: "32157424516",
    appId: "1:32157424516:web:15968aa2d6af9286091bd1",
    measurementId: "G-DJ36Z7VBHT"
  });

  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const functions = firebase.functions();

export {db, auth, storage, functions};