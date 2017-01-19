import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp, _firebaseAuth, register } from '../../firebaseAuth/component';
import { map, toJS } from 'mobx';
import { generateTempPassword } from '../../../utils/utils';
import { StorageClass } from '../../../utils/storage';
import { Constants } from '../../constants';
import { IRegistrationNeedHelpInd, IRegistrationNeedHelpOrg, IRegistrationWantToHelp, IWhatWeNeed, IWhatINeedHelpWith, DataSource, ICause, RegistrationType } from '../../interfaces';

class RegistrationNeedHelpInd implements IRegistrationNeedHelpInd{
    constructor(
            public ID: string,
            public active : boolean,
            public uid: string,
            public registrationType : string,
            public fullName : string,
            public phoneNo : string,
            public email : string,
            public whatINeedHelpWith : string,
            public country: string,
            public state:string,
            public addressLine1: string,
            public addressLine2: string,
            public citySuburb : string,
            public postCode : string){}
}

class RegistrationNeedHelpOrg implements IRegistrationNeedHelpOrg{
    constructor(
            public ID : string,
            public active : boolean,
            public uid: string,
            public registrationType : string,            
            public charityName : string,
            public fullName : string,
            public phoneNo : string,
            public email : string,
            public websiteLink : string,
            public whatWeDo : string,
            public whatWeNeed : string){}
}


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
        this.registrationNeedHelpInd = new RegistrationNeedHelpInd('',false,'','','','','','','','','','','','');
        this.registrationNeedHelpOrg = new RegistrationNeedHelpOrg('',false,'','','','','','','','','');
        this.submitBtnCaption = 'Register';
    }

    @observable registrationType : string;
    @observable formIsVisible : boolean;
    @observable hasTrade : boolean;
    @observable hasRegistered : boolean;
    @observable isLoading : boolean;
    @observable registrationNeedHelpInd : IRegistrationNeedHelpInd;
    @observable registrationNeedHelpOrg : IRegistrationNeedHelpOrg;
    @observable causes : Array<ICause>;
    @observable submitBtnCaption : string;

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
                resolve(result);
            });
        });
    };

    @action("get a registration by type and id")
    getRegistrationByID = (registrationType : RegistrationType, key : string) => {
        return new Promise<any>((resolve) => {
            const dbRef = this.getDBRefByRegistrationType(registrationType,key); 
            _firebaseApp.database().ref(dbRef).once('value', (snapshot) => {
                
                switch(registrationType){
                    case RegistrationType.NeedHelpInd:
                        this.registrationNeedHelpInd = snapshot.val();
                        this.registrationType = 'Individual';
                        break;
                    case RegistrationType.NeedHelpOrg:
                        this.registrationNeedHelpOrg = snapshot.val();
                        this.registrationType = 'Org';
                        break;
                }

                this.submitBtnCaption = 'Save';

                resolve();
            });
        });   
    }

    ///
    /// Private Methods
    ///

    private getDBRefByRegistrationType = (registrationType : RegistrationType, key : string) : string => {
        let dbRef : string = 'registrations';

        switch(registrationType){
            case RegistrationType.NeedHelpInd:
            dbRef += '/NeedHelp/Individuals/' + key;
            break;
            case RegistrationType.NeedHelpOrg:
            dbRef += '/NeedHelp/Organisations/' + key;
            break;
            case RegistrationType.WantToHelp:
            dbRef += '/WantToHelp/' + key;
            break;
        }
        return dbRef;    
    }

}
