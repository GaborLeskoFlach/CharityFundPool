import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp } from '../firebaseAuth/component'
import { map, toJS } from 'mobx';
import { ICause, IDonation } from '../interfaces';

interface IDonationFields{
    
}

export class DonationController {
    
    constructor() {
        this.causes = [];
        this.isLoading = false;      
    }

    @observable causes : Array<ICause>;
    @observable isLoading : boolean;

    @action("reset form(state)")
    resetForm = () => {

    }

    @action("Add new Donation")
    addNewDonation = (donation : IDonation) : Promise<any> => {
        return new Promise((resolve) => {
            _firebaseApp.database().ref('donations').push(donation).then(result => {
                resolve();
                console.log('New Donation has been successfully added');
            });
        });
    };

    @action("get causes from DB")
    getCauses = () : Promise<Array<ICause>> => {
        return new Promise<Array<ICause>>((resolve) => {        
            _firebaseApp.database().ref('needs').orderByChild('active').equalTo(true).on('value', (snapshot) => {
                this.causes = snapshot.val();
                resolve(this.causes);
            })
        })
    };
}
