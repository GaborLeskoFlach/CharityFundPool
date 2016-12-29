import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp } from '../firebaseAuth/component'
import { map, toJS } from 'mobx';
import { ICause } from '../interfaces';

export class CauseController {
    
    constructor() {
        this.causes = [];
        this.isLoading = false;      
    }

    @observable causes : Array<any>;
    @observable isLoading : boolean;


    @action("get causes from DB")
    getCauses = action(() => {
        return new Promise<Array<ICause>>((resolve) => {           
            _firebaseApp.database().ref('causes').on('value', (snapshot) => {
                this.causes = snapshot.val();
                resolve(this.causes);
            });
        })
    })


    @action("Add new Cause")
    addCause = (cause : ICause) : Promise<any> => {
        return new Promise((resolve) => {
            this.isLoading = true;
            _firebaseApp.database().ref('causes').push(cause).then(result => {
                this.isLoading = false;
                resolve();                
            });
        });
    };




}
