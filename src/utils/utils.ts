import { map } from 'lodash';
import { toJS } from 'mobx';
import { IOrgNeedHelpWithListItem, IDonation, IConvertDataConstraint, DataFilter } from '../components/interfaces';

export function addDays(date : Date, days:number) : Date {
    var currentDate = date.getDate();
    date.setDate(currentDate + days);
    return date;
}

export function generateTempPassword() : string {
    const randomPassword2 = new RandomPassword();
    return randomPassword2.create(8);
}

export function convertFromObservable<T extends IConvertDataConstraint>(dataToConvert : Array<T>) : Array<T>{
    let returnData : Array<T> = [];

    map(toJS(dataToConvert), (data : T, key) => (
        data.ID = key,
        returnData.push(data)
    ));

    return returnData;    
}


export function convertData<T extends IConvertDataConstraint>(dataToConvert : Array<T>, dataFilter : DataFilter) : Array<T>{
    let returnData : Array<T> = [];

    map(toJS(dataToConvert), (data : T, key) => (
        data.ID = key,
        returnData.push(data)
    ));

    switch(dataFilter){
        case DataFilter.All:
            return returnData;
        case DataFilter.ActiveOnly:
            return returnData.filter(x => x.active === true);
        case DataFilter.InActiveOnly:
            return returnData.filter(x => x.active === false);
        default:
            return returnData;
    }
}