import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp, register } from '../../firebaseAuth/component';
import { generateTempPassword } from '../../../utils/utils';
import { map, toJS } from 'mobx';

import { IRegistrationNeedHelpInd, IRegistrationNeedHelpOrg, IRegistrationWantToHelp, IMultiSelect } from '../../interfaces';

export class RegisterWantToHelpController {

    constructor() {
        this.hasTrade = false;
        this.hasRegistered = false;
        this.isLoading = false;    
        this.tradeOptionsSelected = [];  

        /*
        this.addTradeOptions({label:'Plumbing', value:'0'});
        this.addTradeOptions({label:'Cleaning', value:'1'});
        this.addTradeOptions({label:'Cooking', value:'2'});
        this.addTradeOptions({label:'Shopping', value:'3'});
        this.addTradeOptions({label:'Garden work', value:'4'});   */     
    }

    @observable hasTrade : boolean;
    @observable hasRegistered : boolean;
    @observable isLoading : boolean;
    @observable tradeOptions : Array<IMultiSelect>;
    @observable tradeOptionsSelected : Array<IMultiSelect>;
 
    addTradeOptions = (value : IMultiSelect) => {
        _firebaseApp.database().ref('utils/tradeOptions').push(value);
    }

    @action("Add new Registration -> Want to Help")
    addNewRegistrationWantToHelp = (registration : IRegistrationWantToHelp) : Promise<any> => {
        return new Promise((resolve) => {
            this.isLoading = true;
            _firebaseApp.database().ref('registrations/WantToHelp').push(registration).then(result => {
                console.log('New Registration has been successfully added');
                resolve(result);
                /*
                register(registration.email, generateTempPassword()).then(response =>{
                    resolve(response);
                    this.isLoading = false;
                }).catch(error => {
                    //TODO => handle exception
                    console.log('Exception occured in addNewRegistrationWantToHelp => ' + error);
                });
                */
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

    @action("set currently selected Trade Options")
    setCurrentTradeOptions = (items : Array<IMultiSelect>) : void => {
        this.tradeOptionsSelected = items;
    }

    @action("get currently selected Trade Options")
    getCurrentTradeOptions = () : Array<IMultiSelect> => {
        return this.tradeOptionsSelected;
    }

}
