import {observable, action } from 'mobx';
import { _firebaseApp } from '../firebaseAuth/component';
import { map, toJS } from 'mobx';

import { IRegistrationNeedHelpInd, IRegistrationWantToHelp, IFieldValidation } from '../interfaces';

interface IRegisterIndividualFormFields{
    postCode : IFieldValidation;
    validationError : string;
}

export class JobSearchController {

    constructor() {
        this.registrationsForNeedHelp_Ind = [];
        this.isLoading = false;  
        this.postCode = '';
        this.includeSurroundingSuburbs = false;
        this.registerIndividualFormState = {
            postCode : {
                fieldValidationError : '',
                touched : false
            },
            validationError : ''            
        }    
    }

    @observable registrationsForNeedHelp_Ind : Array<IRegistrationNeedHelpInd>;
    @observable isLoading : boolean;
    @observable registerIndividualFormState : IRegisterIndividualFormFields;
    @observable postCode : string;
    @observable includeSurroundingSuburbs : boolean;

    @action("get Registrations for NeedHelp from DB")
    getRegistrationsForNeedHelpInd = action((postCode : string) => {
        return new Promise<Array<IRegistrationNeedHelpInd>>((resolve) => {
            _firebaseApp.database().ref('registrations/NeedHelp/Individuals').orderByChild('registrationType').equalTo('Individual').on('value', (snapshot) => {
                this.registrationsForNeedHelp_Ind = snapshot.val();
                resolve(this.registrationsForNeedHelp_Ind);
            })
        });
    })
}
