import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp, register } from '../../firebaseAuth/component';
import { generateTempPassword } from '../../../utils/utils';
import { map, toJS } from 'mobx';

import { IRegistrationNeedHelpInd, IRegistrationNeedHelpOrg, IRegistrationWantToHelp, IMultiSelect, IFieldValidation } from '../../interfaces';

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
        this.resetForm();
    }

    @observable hasTrade : boolean;
    @observable hasRegistered : boolean;
    @observable isLoading : boolean;
    @observable tradeOptions : Array<IMultiSelect>;    
    @observable registerWantToHelp : IRegistrationWantToHelp;
    @observable submitBtnCaption : string;
    @observable registerWantToHelpFormState : IRegisterWantToHelpFormFields;
 
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
                resolve();
            });
        });   
    }

    @action("get a registration by uid")
    getRegistrationByUID = (uid : string) => {
        return new Promise<any>((resolve) => {            
            _firebaseApp.database().ref('registrations/WantToHelp/').orderByChild('uid').equalTo(uid).once('value', (snapshot) => {                
                snapshot.forEach((item) => {
                    this.registerWantToHelp = item.val()
                    resolve()
                    return
                })
                resolve()
            }).catch((error) => {
                console.log('Exception occured in getRegistrationByUID', error.message)
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
