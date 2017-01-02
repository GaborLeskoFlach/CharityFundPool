import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp } from '../firebaseAuth/component'
import { map, toJS } from 'mobx';
import { ICause } from '../interfaces';

export class CauseController {
    
    constructor() {
        this.causes = [];
        this.archivedCauses = [];
        this.isLoading = false;      
    }

    @observable causes : Array<ICause>;
    @observable archivedCauses : Array<ICause>;
    @observable isLoading : boolean;


    @action("get causes from DB")
    getCauses = () : Promise<Array<ICause>> => {
        return new Promise<Array<ICause>>((resolve) => {     
            _firebaseApp.database().ref('needs').orderByChild('active').equalTo(true).on('value', (snapshot) => {
                this.causes = snapshot.val();
                resolve(this.causes);
            })
        })
    };

    @action("get archived causes from DB")
    getArchivedCauses = () : Promise<Array<ICause>> => {
        return new Promise<Array<ICause>>((resolve) => {
            _firebaseApp.database().ref('needs').orderByChild('active').equalTo(false).on('value', (snapshot) => {
                this.archivedCauses = snapshot.val();
                resolve(this.archivedCauses);
            })
        })
    };

    @action("Add new Cause")
    addCause = (cause : ICause) : Promise<any> => {
        return new Promise((resolve) => {
            this.isLoading = true;
            _firebaseApp.database().ref('needs').push(cause).then(result => {                
                resolve();
                this.isLoading = false;
            });
        });
    };
}
