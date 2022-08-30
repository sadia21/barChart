function splitTime(timetoSplit) {
  return timetoSplit.split(":");
}
function getThehours(spliteddata) {
  return spliteddata[0];
}
function getTheminutes(spliteddata) {
  return spliteddata[1];
}
var totalpercentageData = 0;
function getTotalpercentageOfscanData(labels, percentageData) {
  for (var counter in labels) {
    if (labels[counter] != "Prep Time") {
      if (labels[counter] != "Down") {
        if (labels[counter] != "Free Machine") {
          totalpercentageData = totalpercentageData + percentageData[counter];
        }
      }
    }
  }
  return totalpercentageData;
}

export { splitTime, getThehours, getTheminutes, getTotalpercentageOfscanData };
