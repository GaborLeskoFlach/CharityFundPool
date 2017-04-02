import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseApp, _firebaseAuth, register, addNewRegistrationToMapping } from '../../firebaseAuth/component';
import { map, toJS } from 'mobx';
import { generateTempPassword, convertData } from '../../../utils/utils';
import { StorageClass } from '../../../utils/storage';
import { Constants } from '../../constants';
import { DataFilter, IRegistrationNeedHelpInd, IRegistrationNeedHelpOrg, 
        IRegistrationWantToHelp, IWhatWeNeed, IWhatINeedHelpWith, DataSource, 
        ICause, RegistrationType, IFieldValidation, IUserMapping, INeedHelpWithListItem } from '../../interfaces';

interface IRegisterIndividualFormFields{
    fullName : IFieldValidation;
    phoneNo : IFieldValidation;
    email : IFieldValidation;
    country : IFieldValidation;
    addressLine1 : IFieldValidation;
    addressLine2 : IFieldValidation;
    citySuburb : IFieldValidation;
    state : IFieldValidation;
    postCode : IFieldValidation;
    whatINeedHelpWith : IFieldValidation;
    password : IFieldValidation;
    passwordConfirm : IFieldValidation;
    validationError : string;
}

interface IRegisterOrganisationFormFields{
    fullName : IFieldValidation;
    phoneNo : IFieldValidation;
    email : IFieldValidation;
    charityName : IFieldValidation;
    websiteLink : IFieldValidation;
    whatWeDo : IFieldValidation;
    whatWeNeed : IFieldValidation;
    validationError : string;
}

export class RegisterNeedHelpController {

    registrations : IRegistrationNeedHelpInd;
    whatINeedHelpWith : Array<IWhatINeedHelpWith>;

    constructor() {
        this.registrationType = 'Individual';
        this.formIsVisible = false;
        this.hasTrade = false;
        this.hasRegistered = false;
        this.isLoading = false;      
        this.causes = [];
        this.submitBtnCaption = 'Register'; 
        this.individualRegistration = null;
        this.organisationRegistration = null;
        this.isExistingRegistration = false
        this.resetForm();
    }

    individualRegistration : IRegistrationNeedHelpInd;
    organisationRegistration : IRegistrationNeedHelpOrg;
    @observable registrationType : string;
    @observable formIsVisible : boolean;
    @observable hasTrade : boolean;
    @observable hasRegistered : boolean;
    @observable isLoading : boolean;
    @observable registrationNeedHelpInd : IRegistrationNeedHelpInd;
    @observable registrationNeedHelpOrg : IRegistrationNeedHelpOrg;
    @observable causes : Array<ICause>;
    @observable needHelpWithListItem : INeedHelpWithListItem
    @observable submitBtnCaption : string;
    @observable registerIndividualFormState : IRegisterIndividualFormFields;
    @observable registerOrganisationFormState : IRegisterOrganisationFormFields;
    @observable isExistingRegistration : boolean

    addNeed1 = (value : IWhatWeNeed) => {
        _firebaseApp.database().ref('utils/whatWeNeed').push(value);
    }

    addNeed2 = (value : IWhatINeedHelpWith) => {
        _firebaseApp.database().ref('utils/whatINeedHelpWith').push(value);
    }

    @action("reset form (state)")
    resetForm = () => {
        this.registerOrganisationFormState = {
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
            charityName : {
                fieldValidationError : '',
                touched : false
            },
            websiteLink : {
                fieldValidationError : '',
                touched : false
            },
            whatWeDo : {
                fieldValidationError : '',
                touched : false
            },
            whatWeNeed : {
                fieldValidationError : '',
                touched : false
            },                                     
            validationError : ''            
        }  
        this.registerIndividualFormState = {
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
            country : {
                fieldValidationError : '',
                touched : false
            },
            addressLine1 : {
                fieldValidationError : '',
                touched : false
            },
            addressLine2 : {
                fieldValidationError : '',
                touched : false
            },
            citySuburb : {
                fieldValidationError : '',
                touched : false
            },
            state : {
                fieldValidationError : '',
                touched : false
            },
            postCode : {
                fieldValidationError : '',
                touched : false
            },
            whatINeedHelpWith : {
                fieldValidationError : '',
                touched : false
            },
            password : {
                fieldValidationError : '',
                touched : false
            },  
            passwordConfirm : {
                fieldValidationError : '',
                touched : false
            },                                                                           
            validationError : ''            
        }  
        this.registrationNeedHelpInd = {
            active : true,
            uid: '',
            registrationType : '',
            fullName : '',
            phoneNo : '',
            email : '',
            country: '',
            state: '',
            addressLine1: '',
            addressLine2: '',
            citySuburb : '',
            postCode : '',
            addressLocation : null,
            profileImageURL : '',
            needHelpWithList : []
        }
        this.registrationNeedHelpOrg = {
            ID : '',
            active : true,
            uid: '',
            registrationType : '',            
            charityName : '',
            fullName : '',
            phoneNo : '',
            email : '',
            websiteLink : '',
            whatWeDo : '',
            profileImageURL : ''
        }
        this.needHelpWithListItem = {
            whenINeedHelp : {
                singleDate : { day : '', reoccurring : false},
                dateRange : { from : '', to : '' , reoccurring : false},
                flexible : false
            },                      
            typeOfWork : '',
            whatINeedHelpWith : '',
            active : true
        };                       
    }

    @action("Add new NeedHelpWith List Item to User")
    addNeedHelpWithListItem = action((item : INeedHelpWithListItem) : Promise<any> => {
        return new Promise<any>((resolve, reject) => {            
            _firebaseApp.database().ref('registrations/NeedHelp/Individuals/' + this.individualRegistration.ID + '/needHelpWithList/').push(item).then(response => {
                this.getRegistrationByID('NeedHelp',_firebaseAuth.currentUser.uid).then((response) => {
                    resolve(true);
                })  
            }).catch((error) => {
                reject(error.message)
            })
        })        
    })

    @action("Removes a NeedHelpWith List Item from Registration")
    removeNeedHelpWithListItem = action((id : string) : Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            _firebaseApp.database().ref('registrations/NeedHelp/Individuals/' + this.individualRegistration.ID + '/needHelpWithList/' + id).remove().then(response => {
                this.getRegistrationByID('NeedHelp', _firebaseAuth.currentUser.uid).then((response) => {
                    resolve(true);
                })
            }).catch((error) => {
                reject(error.message)
            })
        })        
    })

    @action("Retrieve Causes for Organisation")
    getWhatWeNeedForOrganisation = action(() : Promise<Array<ICause>> => {
        return new Promise<Array<ICause>>((resolve) => {     
            _firebaseApp.database().ref('needs/Organisations').orderByChild('uid').equalTo(_firebaseAuth.currentUser.uid).on('value', (snapshot) => {
                this.causes = snapshot.val();
                resolve(this.causes);
            })
        })
    })

    @action("get a single Cause from DB by id")
    getCause = (id:string) : Promise<ICause> => {
        return new Promise<ICause>((resolve) => {     
            _firebaseApp.database().ref('needs/' + id).once('value', (snapshot) => {
                resolve(snapshot.val());
            })
        })
    };
    
    @action("Archive a Cause")
    archiveCause = (id:string) : Promise<any> =>{
        return new Promise((resolve) => {
            this.getCause(id).then(response => {                
                if(response){
                    response.archiveDate = new Date().toString();
                    response.active = false;
                    _firebaseApp.database().ref('needs/' + id).update(response).then(result => {                
                        resolve();
                    });
                }
            })
        });
    }

    @action("get WhatINeedHelpWith from DB")
    getWhatINeedHelpWith = action(() => {
        return new Promise<Array<IWhatINeedHelpWith>>((resolve) => {
            _firebaseApp.database().ref('utils/whatINeedHelpWith').once('value', (snapshot) => {
                this.whatINeedHelpWith = snapshot.val();  
            }).then(response => {
                resolve(this.whatINeedHelpWith);
            }) 
        });
    })

    @action("move slider right")
    setRegistrationType = action((value:string) => {
        this.registrationType = value;
    });

    @action("set Form visibility")
    setFormVisibility = action(() => {
        this.formIsVisible = !this.formIsVisible;
    })

    @action("set if user has already registered")
    setHasUserRegistered = action(() => {
        this.hasRegistered = true;
    })

    @action("check if Email is unique")
    doesEmailAlreadyUsed = action((ref : string, email : string) => {
        return new Promise<boolean>((resolve) => {
            _firebaseApp.database().ref(ref).orderByChild('email').equalTo(email).on('value', (snapshot) => {
                let result = snapshot.val();
                resolve(result);
            })
        });
    })    

    @action("Add new Registration -> Need Help - for Individuals")
    addNewRegistrationNeedHelpInd = () : Promise<any> => {
        const dbRef : string = 'registrations/NeedHelp/Individuals';
        return new Promise((resolve,reject) => {
            this.registrationNeedHelpInd.registrationType = this.registrationType;
            this.registrationNeedHelpInd.email = this.registrationNeedHelpInd.email.trim().toLowerCase();
            this.doesEmailAlreadyUsed(dbRef,this.registrationNeedHelpInd.email).then((exists) => {
                if(!exists){
                    _firebaseApp.database().ref(dbRef).push(toJS(this.registrationNeedHelpInd)).then(result => {               
                        resolve(result);                         
                    });
                }else{
                    //TODO - there is already a record in the DB with this email
                    reject('This email has already been registered in the system. Please use a different one.');
                }
            })
        });
    };

    @action("Update Registration -> Need Help - for Individuals")
    updateRegistrationNeedHelpInd = () : Promise<any> => {
        const dbRef : string = 'registrations/NeedHelp/Individuals/' + this.registrationNeedHelpInd.ID 
        return new Promise((resolve,reject) => {
            this.registrationNeedHelpInd.registrationType = this.registrationType;
            _firebaseApp.database().ref(dbRef).update(this.registrationNeedHelpInd).then(result => {               
                resolve(true);                         
            }).catch((error) => {
                reject('An error occured when trying to update your registration')
            })
        })
    };

    @action("Add new Registration -> Need Help - for Organsiations")
    addNewRegistrationNeedHelpOrg = () : Promise<any> => {
        const dbRef : string = 'registrations/NeedHelp/Organisations'
        return new Promise((resolve,reject) => {
            this.registrationNeedHelpOrg.registrationType = this.registrationType;
            this.registrationNeedHelpOrg.email = this.registrationNeedHelpOrg.email.trim().toLowerCase();
            this.doesEmailAlreadyUsed(dbRef,this.registrationNeedHelpInd.email).then((exists) => {
                if(!exists){
                    _firebaseApp.database().ref('registrations/NeedHelp/Organisations').push(this.registrationNeedHelpOrg).then(result => {
                        resolve(result);
                    });
                }else{
                    //TODO - there is already a record in the DB with this email
                   reject('This email has already been registered in the system. Please use a different one.');
                }
            });
        })
    }

    @action("Update Registration -> Need Help - for Organsiations")
    updateRegistrationNeedHelpOrg = () : Promise<any> => {
        const dbRef : string = 'registrations/NeedHelp/Organisations' + this.registrationNeedHelpOrg.ID
        return new Promise((resolve,reject) => {
            this.registrationNeedHelpOrg.registrationType = this.registrationType;
            _firebaseApp.database().ref(dbRef).update(this.registrationNeedHelpOrg).then(result => {
                resolve(true);
            }).catch((error) => {
                reject('An error occured when trying to update your registration')
            })
        })
    }    

    @action("get a registration by type and id")
    getRegistrationByTypeAndID = (registrationType : RegistrationType, key : string) => {
        return new Promise<any>((resolve) => {
            const dbRef = this.getDBRefByRegistrationType(registrationType,key); 
            _firebaseApp.database().ref(dbRef).once('value', (snapshot) => {
                
                switch(registrationType){
                    case RegistrationType.NeedHelpInd:
                        this.registrationNeedHelpInd = snapshot.val();
                        this.registrationType = 'Individual';
                        break;
                    case RegistrationType.NeedHelpOrg:
                        this.registrationNeedHelpOrg = snapshot.val();
                        this.registrationType = 'Org';
                        break;
                }

                this.submitBtnCaption = 'Save';
                this.isExistingRegistration = true

                resolve();
            });
        });   
    }

    @action("get a registration by type and id")
    getRegistrationByID = (registrationType : string, key : string) => {
        return new Promise<any>((resolve) => {
            const dbRef : string = 'registrations/' + registrationType
            _firebaseApp.database().ref(dbRef).once('value', (snapshot) => {
                let individuals : any = convertData(snapshot.val().Individuals, DataFilter.ActiveOnly);
                let organisations : any = convertData(snapshot.val().Organisations, DataFilter.ActiveOnly);

                this.individualRegistration = individuals.filter(x => x.uid === key)[0];
                if(!this.individualRegistration){
                    this.organisationRegistration = organisations.filter(x => x.uid === key)[0];
                }

                if(this.individualRegistration){
                    this.submitBtnCaption = 'Save';
                    this.registrationNeedHelpInd = this.individualRegistration;
                    this.isExistingRegistration = true
                }

                if(this.organisationRegistration){
                    this.submitBtnCaption = 'Save';
                    this.registrationNeedHelpOrg = this.organisationRegistration;
                    this.isExistingRegistration = true
                }
                resolve();
            });
        });   
    }

    ///
    /// Private Methods
    ///
    private getDBRefByRegistrationType = (registrationType : RegistrationType, key : string) : string => {
        let dbRef : string = 'registrations';

        switch(registrationType){
            case RegistrationType.NeedHelpInd:
            dbRef += '/NeedHelp/Individuals/' + key;
            break;
            case RegistrationType.NeedHelpOrg:
            dbRef += '/NeedHelp/Organisations/' + key;
            break;
            case RegistrationType.WantToHelp:
            dbRef += '/WantToHelp/' + key;
            break;
        }
        return dbRef;    
    }

}
