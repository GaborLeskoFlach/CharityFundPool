export default function addDays(date : Date, days:number) : Date {
    var currentDate = date.getDate();
    date.setDate(currentDate + days);
    return date;
}