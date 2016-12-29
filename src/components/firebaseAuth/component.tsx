import * as firebase from 'firebase';
import { browserHistory } from 'react-router';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA-Y-PwwThMfyUuQVIliAIU9JHsuQF03_k",
    authDomain: "charityfundpool-staging.firebaseapp.com",
    databaseURL: "https://charityfundpool-staging.firebaseio.com",
    storageBucket: "charityfundpool-staging.appspot.com",
    messagingSenderId: "692978726080"
};

export const _firebaseApp : firebase.FirebaseApplication = firebase.initializeApp(config);
export const _firebaseStorage : firebase.FirebaseStorage = firebase.storage();

function requireAuth(nextState : any, replace : any) {

    if(null === _firebaseApp.auth().currentUser) {
        replace({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname }
        })
    }
}

function register(email: string, password: string) : Promise<boolean>{
    return new Promise((resolve, reject) => {
        if (!email || !password) {
            resolve(false);
            console.log('email and password required');
        }
        // Register user
        _firebaseApp.auth().createUserWithEmailAndPassword(email, password).then((response => {
            resolve(true);
        }))
        .catch(function (error) {
            console.log('register error', error);
            if (error.code === 'auth/email-already-in-use') {
                reject();
            }
        });
    });
}

function signIn(email:string, password:string) : Promise<boolean>{
    return new Promise((resolve,reject) => {
        if (!email || !password) {
            console.log('email and password required');
            resolve(false);
        }

        // Sign in user
        _firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log('Successfully Signed In');
                resolve(true);
            }).catch(error => {
                reject(error);
            });
    });
}

function signOut() : Promise<boolean> {
    return new Promise((resolve,reject) => {
        _firebaseApp.auth().signOut().then(response => {
            resolve(true);
        }).catch(error => {
            reject(error);            
        })
    });
}

function resetPassword(email:string) : Promise<boolean>{
    return new Promise((resolve,reject) => {
        _firebaseApp.auth().sendPasswordResetEmail(email).then(response => {
            resolve(true);
        }).catch(error => {
            reject(error);            
        })
    });    
}

function isUserLoggedIn() : boolean{
    if(null === _firebaseApp.auth().currentUser) {
        return false;
    }else{
        return true;
    }
}

// Listen to auth state changes
_firebaseApp.auth().onAuthStateChanged((user) => {
})

export { requireAuth, register, signIn, signOut, resetPassword, isUserLoggedIn };