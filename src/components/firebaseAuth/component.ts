import * as firebase from 'firebase';
import { browserHistory } from 'react-router';
import { observable, action } from 'mobx';

/*
var firebaseConfig = {
    apiKey: "AIzaSyA-Y-PwwThMfyUuQVIliAIU9JHsuQF03_k",
    authDomain: "charityfundpool-staging.firebaseapp.com",
    databaseURL: "https://charityfundpool-staging.firebaseio.com",
    storageBucket: "charityfundpool-staging.appspot.com",
    messagingSenderId: "692978726080"
};

class FuckYou {
    _firebaseApp : firebase.FirebaseApplication;
    _firebaseStorage : firebase.FirebaseStorage;
    _firebaseAuth : firebase.Auth;

    constructor(config:any){
        this._firebaseApp = firebase.initializeApp(config);
        this._firebaseStorage = firebase.storage();
        this._firebaseAuth = this._firebaseApp.auth();
    }

    requireAuth(nextState : any, replace : any) {

        if(null === this._firebaseAuth.currentUser) {
            replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
            })
        }
    }

    register(email: string, password: string) : Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (!email || !password) {
                resolve(false);
                console.log('email and password required');
            }
            // Register user
            this._firebaseAuth.createUserWithEmailAndPassword(email, password).then((response => {
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

    signIn(email:string, password:string) : Promise<boolean>{
        return new Promise((resolve,reject) => {
            if (!email || !password) {
                console.log('email and password required');
                resolve(false);
            }

            // Sign in user
            this._firebaseAuth.signInWithEmailAndPassword(email, password)
                .then((response) => {
                    console.log('Successfully Signed In');
                    resolve(true);
                }).catch(error => {
                    reject(error);
                });
        });
    }

    signOut() : Promise<boolean> {
        return new Promise((resolve,reject) => {
            this._firebaseAuth.signOut().then(response => {
                resolve(true);
            }).catch(error => {
                reject(error);            
            })
        });
    }

    resetPassword(email:string) : Promise<boolean>{
        return new Promise((resolve,reject) => {
            this._firebaseAuth.sendPasswordResetEmail(email).then(response => {
                resolve(true);
            }).catch(error => {
                reject(error);            
            })
        });    
    }

    isUserLoggedIn() : boolean{
        if(null === this._firebaseAuth.currentUser) {
            return false;
        }else{
            return true;
        }
    }

}

let _fuckYouFirebase = new FuckYou(firebaseConfig);

export { _fuckYouFirebase };
*/


var config = {
    apiKey: "AIzaSyA-Y-PwwThMfyUuQVIliAIU9JHsuQF03_k",
    authDomain: "charityfundpool-staging.firebaseapp.com",
    databaseURL: "https://charityfundpool-staging.firebaseio.com",
    storageBucket: "charityfundpool-staging.appspot.com",
    messagingSenderId: "692978726080"
};

export const _firebaseApp : firebase.FirebaseApplication = firebase.initializeApp(config);
export const _firebaseAuth : firebase.Auth = _firebaseApp.auth();
export const _firebaseStorage : firebase.FirebaseStorage = _firebaseApp.storage();
export const _isUserLoggedIn = observable(false);

function requireAuth(nextState : any, replace : any) {

    if(null === _firebaseApp.auth().currentUser) {
        replace({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname }
        })
    }
}

function register(email: string, password: string, shouldSendVerificationEmail : boolean) : Promise<firebase.User>{
    return new Promise((resolve, reject) => {
        if (!email || !password) {
            resolve(false);
            console.log('email and password required');
        }
        // Register user
        _firebaseAuth.createUserWithEmailAndPassword(email, password).then((userRef => {
            if(shouldSendVerificationEmail){
                if(userRef){
                    userRef.sendEmailVerification().then(response => {
                        //Email sent
                        resolve(userRef);
                    }).catch(error => {
                        console.log('Verifiction Email was not sent due to error: {0}', error);
                        reject();
                    })
                }
            }else{            
                resolve(userRef);
            }
        }))
        .catch(function (error : any) {
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
        _firebaseAuth.signInWithEmailAndPassword(email, password)
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
        _firebaseAuth.signOut().then(response => {
            resolve(true);
        }).catch(error => {
            reject(error);            
        })
    });
}

function resetPassword(email:string) : Promise<boolean>{
    return new Promise((resolve,reject) => {
        _firebaseAuth.sendPasswordResetEmail(email).then(response => {
            resolve(true);
        }).catch(error => {
            reject(error);            
        })
    });    
}

function isUserLoggedIn() : boolean{
    if(null === _firebaseAuth.currentUser) {
        return false;
    }else{
        return true;
    }
}

// Listen to auth state changes
_firebaseApp.auth().onAuthStateChanged((user) => {
    
    if(user){
        this._isUserLoggedIn = true;
    }else{
        this._isUserLoggedIn = false;
    }
})

export { requireAuth, register, signIn, signOut, resetPassword };