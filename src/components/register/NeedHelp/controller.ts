import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp, register } from '../../firebaseAuth/component';
import { map, toJS } from 'mobx';
import { generateTempPassword } from '../../../utils/utils';

import { IRegistrationNeedHelpInd, IRegistrationNeedHelpOrg, IRegistrationWantToHelp, IWhatWeNeed, IWhatINeedHelpWith } from '../../interfaces';


export class RegisterNeedHelpController {

    registrations : IRegistrationNeedHelpInd;
    whatWeNeed : Array<IWhatWeNeed>;
    whatINeedHelpWith : Array<IWhatINeedHelpWith>;

    constructor() {
        this.registrationType = 'Individual';
        this.formIsVisible = false;
        this.hasTrade = false;
        this.hasRegistered = false;
        this.isLoading = false;      
    }

    @observable registrationType : string;
    @observable formIsVisible : boolean;
    @observable hasTrade : boolean;
    @observable hasRegistered : boolean;
    @observable isLoading : boolean;

    addNeed1 = (value : IWhatWeNeed) => {
        _firebaseApp.database().ref('utils/whatWeNeed').push(value);
    }

    addNeed2 = (value : IWhatINeedHelpWith) => {
        _firebaseApp.database().ref('utils/whatINeedHelpWith').push(value);
    }

    @action("get WhatWeNeed from DB")
    getWhatWeNeed = action(() => {
        return new Promise<Array<IWhatWeNeed>>((resolve) => {
            _firebaseApp.database().ref('utils/whatWeNeed').once('value', (snapshot) => {
                this.whatWeNeed = snapshot.val();
            }).then(response => {
                resolve(this.whatWeNeed);
            })  
        });
    })

    @action("get WhatINeedHelpWith from DB")
    getWhatINeedHelpWith = action(() => {
        return new Promise<Array<IWhatINeedHelpWith>>((resolve) => {
            _firebaseApp.database().ref('utils/whatINeedHelpWith').once('value', (snapshot) => {
                this.whatINeedHelpWith = snapshot.val();  
            }).then(response => {
                resolve(this.whatINeedHelpWith);
            }) 
        });
    })

    @action("move slider right")
    setRegistrationType = action((value:string) => {
        this.registrationType = value;
    });

    @action("set Form visibility")
    setFormVisibility = action(() => {
        this.formIsVisible = !this.formIsVisible;
    })

    @action("set if user has already registered")
    setHasUserRegistered = action(() => {
        this.hasRegistered = true;
    })

    @action("Add new Registration -> Need Help - for Individuals")
    addNewRegistrationNeedHelpInd = (registration : IRegistrationNeedHelpInd) : Promise<any> => {
        return new Promise((resolve) => {
            _firebaseApp.database().ref('registrations/NeedHelp/Individuals').push(registration).then(result => {
                console.log('New Registration as Individual has been successfully added');
                /*
                register(registration.email,generateTempPassword()).then(response => {                    
                    resolve(response);
                }).catch(error => {
                    //TODO => handle exception
                    console.log('Exception occured in addNewRegistrationNeedHelpInd => ' + error);
                })*/                              
            });
        });
    };

    @action("Add new Registration -> Need Help - for Organsiations")
    addNewRegistrationNeedHelpOrg = (registration : IRegistrationNeedHelpOrg) : Promise<any> => {
        return new Promise((resolve) => {
            _firebaseApp.database().ref('registrations/NeedHelp/Organisations').push(registration).then(result => {
                console.log('New Registration as Organisation has been successfully added');
                /*
                register(registration.email,generateTempPassword()).then(response => {
                    resolve(response);
                }).catch(error => {
                    //TODO => handle exception
                    console.log('Exception occured in addNewRegistrationNeedHelpOrg => ' + error);
                })
                */
            });
        });
    };
}
