import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp, register } from '../../firebaseAuth/component';
import { generateTempPassword } from '../../../utils/utils';
import { map, toJS } from 'mobx';

import { IRegistrationNeedHelpInd, IRegistrationNeedHelpOrg, IRegistrationWantToHelp, IMultiSelect } from '../../interfaces';

class RegisterWantToHelp implements IRegistrationWantToHelp{
    constructor(
        public ID : string,
        public active : boolean,
        public uid : string,        
        public fullName : string,
        public phoneNo : string,
        public email : string,
        public citySuburb : string,
        public postCode : string,
        public limitations : string,
        public hasTrade : string,
        public listOfTrades : Array<IMultiSelect>
    )
    {}
}

export class RegisterWantToHelpController {

    constructor() {
        this.hasTrade = false;
        this.hasRegistered = false;
        this.isLoading = false;    
        this.tradeOptionsSelected = [];  
        this.registerWantToHelp = new RegisterWantToHelp('',false,'','','','','','','','',[]);
        this.submitBtnCaption = 'Register';
    }

    @observable hasTrade : boolean;
    @observable hasRegistered : boolean;
    @observable isLoading : boolean;
    @observable tradeOptions : Array<IMultiSelect>;
    @observable tradeOptionsSelected : Array<IMultiSelect>;
    @observable registerWantToHelp : IRegistrationWantToHelp;
    @observable submitBtnCaption : string;
 
    @action("Add new Registration -> Want to Help")
    addNewRegistrationWantToHelp = (registration : IRegistrationWantToHelp) : Promise<any> => {
        return new Promise((resolve) => {
            this.isLoading = true;
            _firebaseApp.database().ref('registrations/WantToHelp').push(registration).then(result => {
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

    @action("set currently selected Trade Options")
    setCurrentTradeOptions = (items : Array<IMultiSelect>) : void => {
        this.tradeOptionsSelected = items;
    }

    @action("get currently selected Trade Options")
    getCurrentTradeOptions = () : Array<IMultiSelect> => {
        return this.tradeOptionsSelected;
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
}
