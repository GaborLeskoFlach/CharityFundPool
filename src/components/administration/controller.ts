import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp } from '../firebaseAuth/component';
import { map, toJS } from 'mobx';

import { IRegistrationNeedHelpInd, IRegistrationWantToHelp } from '../interfaces';

export enum RegistrationType{
    NeedHelpInd,
    NeedHelpOrg,
    WantToHelp
}

export class AdministrationController {

    constructor() {
        this.registrationsForNeedHelp_Ind = [];
        this.registrationsForNeedHelp_Org = [];
        this.registrationsForWantToHelp = [];
        this.isLoading = false;      
    }

    @observable registrationsForNeedHelp_Ind : Array<IRegistrationNeedHelpInd>;
    @observable registrationsForNeedHelp_Org : Array<IRegistrationNeedHelpInd>;
    @observable registrationsForWantToHelp : Array<IRegistrationWantToHelp>;
    @observable isLoading : boolean;


    @action("get Registrations for NeedHelp from DB")
    getRegistrationsForNeedHelpInd = action(() => {
        return new Promise<Array<IRegistrationNeedHelpInd>>((resolve) => {
            _firebaseApp.database().ref('registrations/NeedHelp/Individuals').orderByChild('registrationType').equalTo('Individual').on('value', (snapshot) => {
                this.registrationsForNeedHelp_Ind = snapshot.val();
                resolve(this.registrationsForNeedHelp_Ind);
            });
        });
    })

    @action("get Registrations for NeedHelp from DB")
    getRegistrationsForNeedHelpOrg = action(() => {
        return new Promise<Array<IRegistrationNeedHelpInd>>((resolve) => {
            _firebaseApp.database().ref('registrations/NeedHelp/Organisations').orderByChild('registrationType').equalTo('Org').on('value', (snapshot) => {
                this.registrationsForNeedHelp_Org = snapshot.val();
                resolve(this.registrationsForNeedHelp_Org);
            });
        });
    })

    @action("get Registrations for Want to Help from DB")
    getRegistrationsForWantToHelp = action(() => {
        return new Promise<Array<IRegistrationWantToHelp>>((resolve) => {
            _firebaseApp.database().ref('registrations/WantToHelp').on('value', (snapshot) => {
                this.registrationsForWantToHelp = snapshot.val();
                resolve(this.registrationsForWantToHelp);
            }) 
        });
    });

    
    @action("Add new Registration -> Need Help")
    deleteRegistration = (registrationType : RegistrationType, key : string) : Promise<any> => {
        
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

        return new Promise((resolve) => {
            _firebaseApp.database().ref(dbRef).remove().then(result => {
                resolve();
                console.log('Registration has been successfully deleted');
            });
        });
    };
    

}
