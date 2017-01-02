export interface IRegistrationNeedHelpInd extends IConvertDataConstraint{
    ID : string;
    registrationType : string;
    fullName : string;
    phoneNo : string;    
    email : string;
    country? : string;
    addressLine1? : string;
    addressLine2? : string;
    citySuburb? : string;
    postCode? : string;
    whatINeedHelpWith? : string;
    whenINeedHelp? : string;
    active:boolean;
}

export interface IRegistrationNeedHelpOrg extends IConvertDataConstraint{
    ID : string;
    registrationType : string;
    fullName? : string;
    charityName : string;
    phoneNo : string;    
    email : string;
    websiteLink? : string;
    whatWeDo: string;   
    whatWeNeed : string;
    active:boolean;
}

export interface IRegistrationWantToHelp extends IConvertDataConstraint{
    ID : string;
    fullName : string;
    email:string;
    phoneNo : string;    
    citySuburb? : string;
    postCode? : string;
    limitations? : string;
    hasTrade? :string;
    listOfTrades? : Array<IMultiSelect>;
    active:boolean;
}

export interface ICause extends IConvertDataConstraint{
    ID : string;
    title:string;
    description:string;
    createDate?:string;
    photoUrl:string;
    estimatedValue : number;
    bestPrice : number;
    donated?:number;
    toGo?:number;
    archiveDate?:string;
    active : boolean;
}

 
export interface IDonation{

    fullName : string;
    emailAddress : string;
    phoneNo : string;
    zipCode : string; 

    amountToDonate : string;

    nameOnCard : string;
    cardType? : string;
    cardNumber? : string;
    expiryDateMonth : string;
    expiryDateYear : string;
    securityCode : string;
}

export interface IMultiSelect{
    label : string;
    value : string;
}

export interface IWhatWeNeed {
    id : number;
    name : string;
}

export interface IWhatINeedHelpWith {
    id : number;
    name : string;
}

//Contstraint -> For Generic interfaces
export interface IConvertDataConstraint {
    ID: string;
}
