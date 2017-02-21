import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp, register } from '../firebaseAuth/component';
import { map, toJS } from 'mobx';
import { generateTempPassword } from '../../utils/utils';

import { IRegistrationNeedHelpInd, IRegistrationNeedHelpOrg, IRegistrationWantToHelp, RegistrationType } from '../interfaces';

export class AdministrationController {

    constructor() {
        this.registrationsForNeedHelp_Ind = [];
        this.registrationsForNeedHelp_Org = [];
        this.registrationsForWantToHelp = [];
        this.archivedRegistrations = [];
        this.isLoading = false;      
    }

    @observable registrationsForNeedHelp_Ind : Array<IRegistrationNeedHelpInd>;
    @observable registrationsForNeedHelp_Org : Array<IRegistrationNeedHelpOrg>;
    @observable registrationsForWantToHelp : Array<IRegistrationWantToHelp>;
    @observable archivedRegistrations : Array<any>;
    @observable isLoading : boolean;


    @action("get Registrations for NeedHelp from DB")
    getRegistrationsForNeedHelpInd = action(() => {
        return new Promise<Array<IRegistrationNeedHelpInd>>((resolve) => {
            _firebaseApp.database().ref('registrations/NeedHelp/Individuals')
                .orderByChild('registrationType')
                .equalTo('Individual')
                .on('value', (snapshot) => {
                this.registrationsForNeedHelp_Ind = snapshot.val();
                resolve(this.registrationsForNeedHelp_Ind);
            });
        });
    })

    @action("get Registrations for NeedHelp from DB")
    getRegistrationsForNeedHelpOrg = action(() => {
        return new Promise<Array<IRegistrationNeedHelpOrg>>((resolve) => {
            _firebaseApp.database().ref('registrations/NeedHelp/Organisations')
                .orderByChild('registrationType')
                .equalTo('Org')
                .on('value', (snapshot) => {
                this.registrationsForNeedHelp_Org = snapshot.val();
                resolve(this.registrationsForNeedHelp_Org);
            });
        });
    })

    @action("get Registrations for Want to Help from DB")
    getRegistrationsForWantToHelp = action(() => {
        return new Promise<Array<IRegistrationWantToHelp>>((resolve) => {
            _firebaseApp.database().ref('registrations/WantToHelp')
                .on('value', (snapshot) => {
                this.registrationsForWantToHelp = snapshot.val();
                resolve(this.registrationsForWantToHelp);
            }) 
        });
    });

    @action("get archived Registrations from DB")
    getArchivedRegistrations = action((registrationType : RegistrationType) => {
       return new Promise<any>((resolve) => {      
            const dbRef : string = this.getDBRefByRegistrationType(registrationType, '');

            this.getRegistrationsByType(dbRef).then(response => {
               resolve(response);
            }) 
        });       
    });    

    @action("get Registrations by Type from DB")
    getRegistrationsByType = action((dbRef : string) => {
        return new Promise<Array<IRegistrationWantToHelp>>((resolve) => {
            _firebaseApp.database().ref(dbRef).orderByChild('active').equalTo(false).on('value', (snapshot) => {
                this.archivedRegistrations = snapshot.val();
                resolve();
            }); 
        });
    });

    @action("Archive a Registration")
    archiveRegistration = (registrationType : RegistrationType, key : string) : Promise<any> => {
        return new Promise<any>((resolve) => {      
            const dbRef = this.getDBRefByRegistrationType(registrationType, key);

            this.getRegistration(dbRef).then(response => {
                if(response){
                    response.archiveDate = new Date().toString();
                    response.active = false;
                    _firebaseApp.database().ref(dbRef).update(response).then(result => {                
                        resolve();
                    });
                }
            }) 
        });       
    };

    @action("Re-Activate a Registration")
    activateRegistration = (registrationType : RegistrationType, key : string) : Promise<any> => {
        return new Promise<any>((resolve) => {      
            const dbRef = this.getDBRefByRegistrationType(registrationType,key);
            
            this.getRegistration(dbRef).then(response => {
                if(response){
                    response.archiveDate = '';
                    response.active = true;
                    _firebaseApp.database().ref(dbRef).update(response).then(result => {                
                        resolve();
                    });
                }
            }) 
        });       
    };

    @action("Physically deletes a Registration from DB")
    deleteRegistration = (registrationType : RegistrationType, key : string) : Promise<any> => {
        return new Promise<any>((resolve) => {      
            const dbRef = this.getDBRefByRegistrationType(registrationType,key);
             _firebaseApp.database().ref(dbRef).remove().then(response => {
                console.log('Remove Succeeded!');
             }).catch(error => {
                console.log('Remove failed: {0}', error.message);
             })
        });       
    };

    @action("Register User for the first time to allow them to log into app")
    registerUser = (registrationType : RegistrationType, key : string, email : string, registerUser : boolean) : Promise<any> => {
        return new Promise<any>((resolve) => {          
            const dbRef = this.getDBRefByRegistrationType(registrationType,key);            
            this.getRegistration(dbRef).then(registration => {
                if(registration){
                    register(email,'1234567890', true).then(userRef => {                                                
                        //Update UID field
                        registration.uid = userRef.uid;
                        this.updateRegistration(dbRef,registration).then(response => {
                            resolve();
                        });
                    }).catch(error => {
                        //TODO => handle exception
                        console.log('Exception occured in addNewRegistrationNeedHelpInd => ' + error);
                    })
                }
            });            
        });
    }

    ///
    /// Private Methods
    ///

    private getRegistration = (ref : string) : Promise<any> => {
        return new Promise<any>((resolve) => {     
            _firebaseApp.database().ref(ref).once('value', (snapshot) => {
                resolve(snapshot.val());
            });
        });
    };

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

    private updateRegistration = (dbRef : string, registration : any) : Promise<any> => {
        return new Promise((resolve) => {
            _firebaseApp.database().ref(dbRef).update(registration).then(result => {                
                resolve();                       
            });
        });
    };

}
