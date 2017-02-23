import * as firebase from 'firebase';
import { browserHistory } from 'react-router';
import { observable, action } from 'mobx';

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

function getMappingInfoForUser (uid : string) : Promise<any> {
    return new Promise<any>((resolve) => {     
        _firebaseApp.database().ref("users").equalTo(uid,"uid").once('value', (snapshot) => {
            resolve(snapshot.val());
        });
    });
};

export { requireAuth, register, signIn, signOut, resetPassword };