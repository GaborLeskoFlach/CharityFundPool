export function addDays(date : Date, days:number) : Date {
    var currentDate = date.getDate();
    date.setDate(currentDate + days);
    return date;
}

export function generateTempPassword() : string {
    const randomPassword2 = new RandomPassword();
    return randomPassword2.create(8);
}