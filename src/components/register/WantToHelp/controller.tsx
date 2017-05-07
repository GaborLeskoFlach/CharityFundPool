import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp, register } from '../../firebaseAuth/component';
import { generateTempPassword, convertData } from '../../../utils/utils';
import { map, toJS } from 'mobx';

import { IRegistrationNeedHelpInd, IRegistrationNeedHelpOrg, 
        IRegistrationWantToHelp, IMultiSelect, IFieldValidation, 
        DataFilter, IUserMapping, RegistrationType, ILocation } from '../../interfaces';

interface IRegisterWantToHelpFormFields{
    fullName : IFieldValidation;
    email:IFieldValidation;
    phoneNo : IFieldValidation;    
    citySuburb : IFieldValidation;
    postCode : IFieldValidation;
    limitations : IFieldValidation;  
    password : IFieldValidation;
    validationError : string;  
}

export class RegisterWantToHelpController {

    constructor() {
        this.hasTrade = false;
        this.hasRegistered = false;
        this.isLoading = false;    
        this.tradeOptionsSelected = [];                 
        this.submitBtnCaption = 'Register';
        this.isExistingRegistration = false
        this.resetForm();
    }

    @observable hasTrade : boolean;
    @observable hasRegistered : boolean;
    @observable isLoading : boolean;
    @observable tradeOptions : Array<IMultiSelect>;    
    @observable registerWantToHelp : IRegistrationWantToHelp;
    @observable submitBtnCaption : string;
    @observable registerWantToHelpFormState : IRegisterWantToHelpFormFields;
    @observable isExistingRegistration : boolean
    tradeOptionsSelected : Array<IMultiSelect>;

    @action("Reset Form (state)")
    resetForm = () : void => {
        this.registerWantToHelpFormState = {
            fullName : {
                fieldValidationError : '',
                touched : false
            },
            phoneNo : {
                fieldValidationError : '',
                touched : false
            },
            email : {
                fieldValidationError : '',
                touched : false
            },
            citySuburb : {
                fieldValidationError : '',
                touched : false
            },
            postCode : {
                fieldValidationError : '',
                touched : false
            },
            limitations : {
                fieldValidationError : '',
                touched : false
            },
            password : {
                fieldValidationError : '',
                touched : false
            },            
            validationError : ''            
        }    
        
        this.registerWantToHelp = {
            ID : '',
            active : true,
            uid : '',        
            fullName : '',
            phoneNo : '',
            email :'',
            citySuburb : '',
            postCode : '',
            limitations : '',
            hasTrade : false,
            listOfTrades : [],
            profileImageURL : '',
        };
    }


    @action("check if Email is unique")
    doesEmailAlreadyUsed = action((ref : string, email : string) => {
        return new Promise<boolean>((resolve) => {
            _firebaseApp.database().ref(ref).orderByChild('email').equalTo(email).on('value', (snapshot) => {
                let result = snapshot.val();
                resolve(result);
            })
        });
    })    

    @action("Add new Registration -> Want to Help")
    addNewRegistrationWantToHelp = () : Promise<any> => {
        const dbRef : string = 'registrations/WantToHelp';
        return new Promise((resolve,reject) => {
            this.registerWantToHelp.hasTrade = this.hasTrade,
            this.registerWantToHelp.listOfTrades = this.getCurrentTradeOptions();
            this.registerWantToHelp.email = this.registerWantToHelp.email.trim().toLowerCase();
            this.doesEmailAlreadyUsed(dbRef,this.registerWantToHelp.email).then((exists) => {
                if(!exists){
                    _firebaseApp.database().ref(dbRef).push(toJS(this.registerWantToHelp)).then(result => {
                        resolve(result);
                    });
                }else{
                    //TODO - there is already a record in the DB with this email
                    reject('This email has already been registered in the system. Please use a different one.');
                }
            })
        });
    };

    @action("Update Registration -> Want to Help")
    updateNewRegistrationWantToHelp = () : Promise<any> => {
        const dbRef : string = 'registrations/WantToHelp/' + this.registerWantToHelp.ID;
        return new Promise((resolve,reject) => {
            this.registerWantToHelp.email = this.registerWantToHelp.email.trim().toLowerCase()
            this.doesEmailAlreadyUsed(dbRef,this.registerWantToHelp.email).then((exists) => {
                if(!exists){
                    _firebaseApp.database().ref(dbRef).update(this.registerWantToHelp).then(result => {
                        resolve(true);
                    });
                }else{
                    //TODO - there is already a record in the DB with this email
                    reject('This email has already been registered in the system. Please use a different one.')
                }
            })
        })
    }

    @action("Fetch TradeOptions")
    getTradeOptions = () : Promise<Array<IMultiSelect>> => {
        return new Promise<Array<IMultiSelect>>((resolve) => {
            _firebaseApp.database().ref('utils/tradeOptions').once('value', (snapshot) => {
                this.tradeOptions = snapshot.val();
            }).then(response => {
                resolve(this.tradeOptions);
            })  
        });        
    }

    @action("get a registration by id")
    getRegistrationByID = (key : string) => {
        return new Promise<any>((resolve) => {            
            _firebaseApp.database().ref('registrations/WantToHelp/' + key).once('value', (snapshot) => {
                this.registerWantToHelp = snapshot.val();
                this.registerWantToHelp.ID = key
                this.isExistingRegistration = true
                this.submitBtnCaption = 'Save'
                resolve();
            });
        });   
    }

    @action("get a registration by uid")
    getRegistrationByUID = (key : string) => {
        const dbRef :string = '/registrations/WantToHelp/'
        return new Promise<any>((resolve, reject) => {            
            _firebaseApp.database().ref(dbRef).once('value', (snapshot) => {
                let registrations : any = convertData(snapshot.val(), DataFilter.ActiveOnly)            
                this.registerWantToHelp = registrations.filter(x => x.uid === key)[0]
                if(this.registerWantToHelp){
                    this.isExistingRegistration = true
                    this.submitBtnCaption = 'Save'
                    resolve()
                }else{
                    reject()
                }
            }).catch((error) => {
                console.log('Exception occured in getRegistrationByUID', error.message)
            })
        })
    }

    //Should be in STORE
    @action("get a User Registration Location by UID")
    getUserRegistrationLocationByUID = (key : string) => {
        return new Promise<any>((resolve) => {
            const dbRef = '/users/' + key
            _firebaseApp.database().ref(dbRef).once('value', (snapshot) => {
                const user : IUserMapping = snapshot.val()
                if(user){
                    if(user.locations){
                        resolve(user.locations.filter(x => x.registrationType === RegistrationType.WantToHelp).map(o => { return o.location}))
                    }else{
                        resolve('')
                    }
                }else{
                    resolve('')
                }
            })
        })  
    }

   //Should be in the STORE
    @action("get a registration by location")
    getRegistrationByLocation = (locations) => {
        return new Promise<any>((resolve) => {   
            const location = locations[0]
            _firebaseApp.database().ref(location).once('value', (snapshot) => {
                this.registerWantToHelp = snapshot.val();
                this.isExistingRegistration = true
                this.submitBtnCaption = 'Save'
                resolve()
            }).catch((error)=>{
                console.log('Error in getRegistrationByLocation =>', error)
            })
        });   
    }    

    //
    // Private Methods
    //
    
    //set currently selected Trade Options")
    setCurrentTradeOptions = (items : Array<IMultiSelect>) : void => {
        this.registerWantToHelp.listOfTrades = items
        this.tradeOptionsSelected = items;
    }

    //get currently selected Trade Options")
    getCurrentTradeOptions = () : Array<IMultiSelect> => {
        return this.tradeOptionsSelected;
    }

}
