import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAh5vjIaONRfbKPjeHiAc-UvV5nOXseA8Y",
    authDomain: "charityfundpool.firebaseapp.com",
    databaseURL: "https://charityfundpool.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "42018346299"
};

firebase.initializeApp(config);

const root : Firebase = firebase.database().ref().child('react');
const todos : Firebase = root.child('todos');

export interface IFirebaseStoreRef{
    root : Firebase;
    todos : Firebase;
}

const FirebaseRef : IFirebaseStoreRef = {
  root,
  todos
};

export { FirebaseRef };