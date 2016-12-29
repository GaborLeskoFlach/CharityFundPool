import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp } from '../firebaseAuth/component';
import { map, toJS } from 'mobx';

import { IRegistrationNeedHelpInd, IRegistrationWantToHelp } from '../interfaces';

export class JobSearchController {

    constructor() {
        this.registrationsForNeedHelp_Ind = [];
        this.isLoading = false;      
    }

    @observable registrationsForNeedHelp_Ind : Array<IRegistrationNeedHelpInd>;
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
}
