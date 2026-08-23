import { Jalaali } from "ts-jalaali";
import { calendars } from "../../datePicker/DatePicker";

const momentLocales ={
  EN : "en",
  FA : "fa"
}

export function dateToJalaaliString(date) {
  let newDate = Jalaali.toJalaali(date);

  return newDate.jy
    .toString()
    .padStart(4, "")
    .concat("/")
    .concat(newDate.jm.toString().padStart(2, "0"))
    .concat("/")
    .concat(newDate.jd.toString().padStart(2, "0"));
}

export function stringToGregorianDate(str) {
  let date = new Date();
  let dateArr
  if (str.includes('/'))
    dateArr = str.split("/");
  if (str.includes('-'))
    dateArr = str.split("-");

  const year = parseInt(dateArr[0]);
  const month = parseInt(dateArr[1]);
  const day = parseInt(dateArr[2]);

  let gregorianDate = Jalaali.toGregorian(year, month, day);

  date.setFullYear(gregorianDate.gy);
  //month range is 0-11 in Date
  date.setMonth(gregorianDate.gm - 1);
  date.setDate(gregorianDate.gd);

  return date;
}

export function convertJalaaliToGregorian(stringDate) {
  const dateArray = stringDate.split("/");
  const gregorian = Jalaali.toGregorian(
    Number(dateArray[0]),
    Number(dateArray[1]),
    Number(dateArray[2])
  );
  return `${gregorian.gy}/${gregorian.gm}/${gregorian.gd}`;
}

export function convertNumbers2English(number) {
  const str = number.toString();
  return str
    .replace(
      /[\u0660-\u0669]/g,
      (c) => {
        return c.charCodeAt(0) - 0x0660;
      }
    )
    .replace(
      /[\u06f0-\u06f9]/g,
      (c) => {
        return c.charCodeAt(0) - 0x06f0;
      }
    );
}

export function stringToMoment(
  str,
  calendar,
  format = "YYYY/MM/DD"
) {
  let moment = require("moment");

  if (!Boolean(str)) {
    return null;
  }

  if (calendar == calendars.GREGORIAN) {
    moment.locale(momentLocales.EN);
  } else {
    moment.locale(momentLocales.FA);
  }
  return moment(str, format);
}

export function stringToDate(value) {
  const date = new Date();
  const arrValue = value.split("/");
  if (arrValue.length < 3) {
    console.error(`stringToDate parameter must be year/month/day`);
    return date; // return now date
  }
  date.setFullYear(Number(arrValue[0]));
  date.setMonth(Number(arrValue[1]) - 1);
  date.setDate(Number(arrValue[2]));
  return date;
}

export function dateToString(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const stringDate = `${year}/${month + 1}/${day}`;
  return stringDate;
}
/*=========================*/

export function jalaaliToGregorian(value) {
  if (value) {
    const gregorianDate = stringToGregorianDate(value);
    return dateToString(gregorianDate);
  }
  return "";
}

export function gregorianToJalaaliDate(value) {
  const date = stringToDate(value);
  return dateToJalaaliString(date);
}

/*_________________________________________*/

export function getDateRangeBetweenTwoDate(dateFrom,dateTo) {
  let rangeData=0;
  const startDate =dateFrom  ?  dateFrom.split('/') : [];
  const endDate = dateTo  ? dateTo.split('/') : [];

  if (startDate.length > 2 && endDate.length > 2) {
    const startDays = (parseInt(startDate[0]) * 365 + parseInt(startDate[1]) * 30 + parseInt(startDate[2]));
    const endDays = (parseInt(endDate[0]) * 365 + parseInt(endDate[1]) * 30 + parseInt(endDate[2]));
    rangeData=endDays-startDays
  }
 return rangeData;
}
