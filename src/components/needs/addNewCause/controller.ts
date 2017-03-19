import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp } from '../../firebaseAuth/component'
import { map, toJS } from 'mobx';
import { ICause } from '../../interfaces';
import { StorageClass } from '../../../utils/storage';
import { Constants } from '../../constants';

export class AddNewCauseController {
    
    constructor() {
        this.isLoading = false;      
    }


    @observable isLoading : boolean;

    @action("Add new Cause to an organisation")
    addCause = (id : string, cause : ICause) : Promise<any> => {
        return new Promise((resolve) => {
            this.isLoading = true;
            _firebaseApp.database().ref('registrations/NeedHelp/Organisations/' + id + '/needs').push(cause).then(result => {                
                resolve();
                this.isLoading = false;
            });
        });
    };

}
