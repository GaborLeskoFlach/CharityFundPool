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
            listOfTrades : []
        };
    }

    @action("Add new Registration -> Want to Help")
    addNewRegistrationWantToHelp = () : Promise<any> => {
        return new Promise((resolve) => {
            this.registerWantToHelp.hasTrade = this.hasTrade,
            this.registerWantToHelp.listOfTrades = this.getCurrentTradeOptions();
            _firebaseApp.database().ref('registrations/WantToHelp').push(toJS(this.registerWantToHelp)).then(result => {
                resolve(result);
            });
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

    //
    // Private Methods
    //
    
    //set currently selected Trade Options")
    setCurrentTradeOptions = (items : Array<IMultiSelect>) : void => {
        this.tradeOptionsSelected = items;
    }

    //get currently selected Trade Options")
    getCurrentTradeOptions = () : Array<IMultiSelect> => {
        return this.tradeOptionsSelected;
    }

}
