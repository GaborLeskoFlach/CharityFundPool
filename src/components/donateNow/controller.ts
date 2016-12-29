import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp } from '../firebaseAuth/component';
import { map, toJS } from 'mobx';

import { IDonation   } from './component';

export interface IWhatWeNeed {
    id : number;
    name : string;
}

export interface IWhatINeedHelpWith{
    id : number;
    name : string;
}

export class DonationController {



    constructor() {
        this.isLoading = false;        
    }

    @observable isLoading : boolean;


    @action("Add new Donation")
    addNewDonation = (donation : IDonation) : Promise<any> => {
        return new Promise((resolve) => {
            _firebaseApp.database().ref('donations').push(donation).then(result => {
                resolve();
                console.log('New Donation has been successfully added');
            });
        });
    };

}
