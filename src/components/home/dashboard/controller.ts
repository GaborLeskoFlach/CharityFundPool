import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp, register } from '../../firebaseAuth/component';
import { convertData } from '../../../utils/utils';
import { DataFilter, IUserMapping, ILocation, RegistrationType } from '../../interfaces';

interface IUserRegistrationLink{
    displayText : string
    redirectLink : string
}

export class DashboardController {

    constructor() {
        this.isLoading = false;    
        this.isExistingRegistration = false
        this.userRegistrations = []
    }

    @observable isExistingRegistration : boolean
    @observable isLoading : boolean
    @observable userRegistrations : Array<IUserRegistrationLink>

    //Should be in STORE
    @action("get a User Registration Location by UID")
    getUserRegistrationLocationByUID = (key : string) => {
        return new Promise<any>((resolve) => {
            const dbRef = '/users/' + key
            _firebaseApp.database().ref(dbRef).once('value', (snapshot) => {
                const user : IUserMapping = snapshot.val()
                if(user && user.locations){
                    user.locations.sort((a,b) => { return new Date(a.createdAt).getDate() - new Date(b.createdAt).getDate()}).map((location : ILocation) => {
                        let regType : IUserRegistrationLink
                        switch(location.registrationType){
                            case RegistrationType.NeedHelpInd:
                            regType = { displayText : 'Needs help (Individual)', redirectLink : '/register/NeedHelp' }
                            break
                            case RegistrationType.NeedHelpOrg:
                            regType = { displayText : 'Needs help (Organisation)', redirectLink : '/register/NeedHelp' }
                            break
                            case RegistrationType.WantToHelp:
                            regType = { displayText : 'Wants to Help', redirectLink : '/register/WantToHelp' }
                            break
                        }
                        this.userRegistrations.push(regType)
                        resolve()
                    })
                }else{
                    resolve()
                }
            })
        })  
    }   

}
