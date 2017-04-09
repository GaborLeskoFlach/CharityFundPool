import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp } from '../firebaseAuth/component'
import { map, toJS } from 'mobx';
import { IOrgNeedHelpWithListItem } from '../interfaces';

export class CauseController {
    
    constructor() {
        this.causes = [];
        this.archivedCauses = [];
        this.isLoading = false;      
    }

    @observable causes : Array<IOrgNeedHelpWithListItem>;
    @observable archivedCauses : Array<IOrgNeedHelpWithListItem>;
    @observable isLoading : boolean;

    @action("Add new Cause to an organisation")
    addCause = (id : string, cause : IOrgNeedHelpWithListItem) : Promise<any> => {
        return new Promise((resolve) => {
            this.isLoading = true;
            _firebaseApp.database().ref('needs/').push(cause).then(result => {                
                resolve();
                this.isLoading = false;
            });
        });
    };

    @action("get causes from DB")
    getCauses = () : Promise<Array<IOrgNeedHelpWithListItem>> => {
        return new Promise<Array<IOrgNeedHelpWithListItem>>((resolve) => {     
            _firebaseApp.database().ref('needs').orderByChild('active').equalTo(true).on('value', (snapshot) => {
                this.causes = snapshot.val();
                resolve(this.causes);
            })
        })
    };

    @action("get archived causes from DB")
    getArchivedCauses = () : Promise<Array<IOrgNeedHelpWithListItem>> => {
        return new Promise<Array<IOrgNeedHelpWithListItem>>((resolve) => {
            _firebaseApp.database().ref('needs').orderByChild('active').equalTo(false).on('value', (snapshot) => {
                this.archivedCauses = snapshot.val();
                resolve(this.archivedCauses);
            })
        })
    };

    @action("get a single Cause from DB by id")
    getCause = (id:string) : Promise<IOrgNeedHelpWithListItem> => {
        return new Promise<IOrgNeedHelpWithListItem>((resolve) => {     
            _firebaseApp.database().ref('needs/' + id).once('value', (snapshot) => {
                resolve(snapshot.val());
            })
        })
    };  

    @action("Archive a Cause")
    archiveCause = (id:string) : Promise<any> =>{
        return new Promise((resolve) => {
            this.isLoading = true;
            
            this.getCause(id).then(response => {
                
                if(response){
                    response.archiveDate = new Date().toString();
                    response.active = false;
                    _firebaseApp.database().ref('needs/' + id).update(response).then(result => {                
                        resolve();
                        this.isLoading = false;
                    });
                }
            })
        });
    }
}
