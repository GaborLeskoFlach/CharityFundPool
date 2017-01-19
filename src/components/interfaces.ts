export interface IRegistrationNeedHelpInd extends IConvertDataConstraint{
    ID : string;
    registrationType : string;
    fullName : string;
    phoneNo : string;    
    email : string;
    country? : string;
    state? :string;
    addressLine1? : string;
    addressLine2? : string;
    citySuburb? : string;
    postCode? : string;
    whatINeedHelpWith? : string;
    whenINeedHelp? : string;
    active:boolean;
    uid:string;
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
    uid:string;
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
    uid:string;
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
    uid:string;
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
    uid:string;
}

export interface IMultiSelect{
    label : string;
    value : string;
    ID : string;
    active : boolean;
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
    active:boolean;
}

export enum DataFilter{
    All,
    ActiveOnly,
    InActiveOnly
}

export interface IRouteParams_Registrations{
    ID : string;
    Type : string;
    requestType : string;
}

export enum RegistrationType{
    NeedHelpInd,
    NeedHelpOrg,
    WantToHelp
}

//For DataTables (defining structure for Rows)
export interface IColumnData {
    title: string;
    prop: string;
    render?: (val, row) => void;
    className?: string;
}

export enum DataSource {
    Firebase,
    LocalStorage
}