export interface IRegistrationNeedHelpInd{
    ID? : string;
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
}

export interface IRegistrationNeedHelpOrg{
    ID? : string;
    registrationType : string;
    fullName? : string;
    charityName : string;
    phoneNo : string;    
    email : string;
    websiteLink? : string;
    whatWeDo: string;   
    whatWeNeed : string;
}

export interface IRegistrationWantToHelp{
    ID? : string;
    fullName : string;
    email:string;
    phoneNo : string;    
    citySuburb? : string;
    postCode? : string;
    limitations? : string;
    hasTrade? :string;
    listOfTrades? : Array<IMultiSelect>;
}

export interface ICause{
    ID? : string;
    title:string;
    description:string;
    createDate?:string;
    photoUrl:string;
    estimatedValue : number;
    bestPrice : number;
    donated?:number;
    toGo?:number;
}

export interface IMultiSelect{
    label : string;
    value : string;
}

export interface IWhatWeNeed {
    id : number;
    name : string;
}

export interface IWhatINeedHelpWith{
    id : number;
    name : string;
}
