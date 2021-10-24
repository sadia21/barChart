function splitTime(timetoSplit) {
  return timetoSplit.split(":");
}
function getThehours(spliteddata) {
  return spliteddata[0];
}
function getTheminutes(spliteddata) {
  return spliteddata[1];
}

export { splitTime, getThehours, getTheminutes };
