import {DateTime} from 'luxon';

function getMinDateForUpload(){
  let todaysDate = DateTime.utc()
  let minDate = todaysDate.minus({ days: 14 });
  const month = minDate.month.toString().length > 1 ? minDate.month : `0${minDate.month}`
  const day = minDate.day.toString().length > 1 ? minDate.day : `0${minDate.day}`
  const hour = minDate.hour.toString().length > 1 ? minDate.hour : `0${minDate.hour}`
  const minutes = minDate.minute.toString().length > 1 ? minDate.minute : `0${minDate.minute}`
  const seconds = minDate.second.toString().length > 1 ? minDate.second : `0${minDate.second}`
  return `${minDate.year}-${month}-${day}T${hour}%3A${minutes}%3A${seconds}Z`
}

export {getMinDateForUpload}