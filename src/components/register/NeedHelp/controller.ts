import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp, _firebaseAuth, register } from '../../firebaseAuth/component';
import { map, toJS } from 'mobx';
import { generateTempPassword } from '../../../utils/utils';
import { StorageClass } from '../../../utils/storage';
import { Constants } from '../../constants';
import { IRegistrationNeedHelpInd, IRegistrationNeedHelpOrg, IRegistrationWantToHelp, IWhatWeNeed, IWhatINeedHelpWith, DataSource, ICause } from '../../interfaces';
import { List } from 'linqts';

export class RegisterNeedHelpController {

    registrations : IRegistrationNeedHelpInd;
    whatINeedHelpWith : Array<IWhatINeedHelpWith>;

    constructor() {
        this.registrationType = 'Individual';
        this.formIsVisible = false;
        this.hasTrade = false;
        this.hasRegistered = false;
        this.isLoading = false;      
        this.causes = [];
    }

    @observable registrationType : string;
    @observable formIsVisible : boolean;
    @observable hasTrade : boolean;
    @observable hasRegistered : boolean;
    @observable isLoading : boolean;
    
    @observable causes : Array<ICause>;

    addNeed1 = (value : IWhatWeNeed) => {
        _firebaseApp.database().ref('utils/whatWeNeed').push(value);
    }

    addNeed2 = (value : IWhatINeedHelpWith) => {
        _firebaseApp.database().ref('utils/whatINeedHelpWith').push(value);
    }

    @action("Retrieve Causes for current user")
    getWhatWeNeedForUser = action(() : Promise<Array<ICause>> => {
        return new Promise<Array<ICause>>((resolve) => {     
            _firebaseApp.database().ref('needs').orderByChild('uid').equalTo(_firebaseAuth.currentUser.uid).on('value', (snapshot) => {
                this.causes = snapshot.val();
                resolve(this.causes);
            })
        })
    })

    @action("get a single Cause from DB by id")
    getCause = (id:string) : Promise<ICause> => {
        return new Promise<ICause>((resolve) => {     
            _firebaseApp.database().ref('needs/' + id).once('value', (snapshot) => {
                resolve(snapshot.val());
            })
        })
    };
    
    @action("Archive a Cause")
    archiveCause = (id:string) : Promise<any> =>{
        return new Promise((resolve) => {
            
            this.getCause(id).then(response => {
                
                if(response){
                    response.archiveDate = new Date().toString();
                    response.active = false;
                    _firebaseApp.database().ref('needs/' + id).update(response).then(result => {                
                        resolve();
                    });
                }
            })
        });
    }

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
                resolve(result);                       
            });
        });
    };

    @action("Add new Registration -> Need Help - for Organsiations")
    addNewRegistrationNeedHelpOrg = (registration : IRegistrationNeedHelpOrg) : Promise<any> => {
        return new Promise((resolve) => {
            _firebaseApp.database().ref('registrations/NeedHelp/Organisations').push(registration).then(result => {
                console.log('New Registration as Organisation has been successfully added');
                resolve(result);
            });
        });
    };
}
