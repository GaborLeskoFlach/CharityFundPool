import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp, register } from '../../firebaseAuth/component';
import { convertData } from '../../../utils/utils';
import { DataFilter, IUserMapping } from '../../interfaces';

export class DashboardController {

    constructor() {
        this.isLoading = false;    
        this.isExistingRegistration = false
    }

    @observable isExistingRegistration : boolean
    @observable isLoading : boolean

    //Should be in STORE
    @action("get a User Registration Location by UID")
    getUserRegistrationLocationByUID = (key : string) => {
        return new Promise<any>((resolve) => {
            const dbRef = '/users/' + key
            _firebaseApp.database().ref(dbRef).once('value', (snapshot) => {
                const user : IUserMapping = snapshot.val()
                if(user){
                    resolve(user.location)
                }else{
                    resolve()
                }
            })
        })  
    }

   //Should be in the STORE
    @action("get a registration by location")
    getRegistrationByLocation = (location : string) => {
        return new Promise<any>((resolve) => {            
            _firebaseApp.database().ref(location).once('value', (snapshot) => {
                //this.registerWantToHelp = snapshot.val();
                this.isExistingRegistration = true
                resolve();
            });
        });   
    }    

}
