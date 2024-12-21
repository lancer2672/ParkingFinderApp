export const convertToISOLocale = (date) => {
    let checkinTimeWithTimeZone = new Date(date);
    checkinTimeWithTimeZone.setHours(checkinTimeWithTimeZone.getHours() + 7);
   return  checkinTimeWithTimeZone.toISOString();
}