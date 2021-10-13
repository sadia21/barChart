var scanTypeData = [];
var scanTypeLabel = [];
var scanTypeDataInPercentage = [];
var machineName = "MRI Aleris Danderyd";
machineData = [
  {
    startTime: "7:30",
    endTime: "7:50",
    scanType: "Head Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "8:10",
    endTime: "8:45",
    scanType: "Head Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "9:05",
    endTime: "9:25",
    scanType: "Leg Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "9:30",
    endTime: "9:55",
    scanType: "Leg Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "11:15",
    endTime: "11:45",
    scanType: "Spine Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "12:15",
    endTime: "12:30",
    scanType: "Head Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "12:30",
    endTime: "12:40",
    scanType: "Change Over",
    timeType: "Change Over",
  },
  {
    startTime: "12:40",
    endTime: "12:60",
    scanType: "Spine Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "13:15",
    endTime: "13:25",
    scanType: "Down",
    timeType: "Down Time",
  },
  {
    startTime: "13:35",
    endTime: "13:40",
    scanType: "Change Over",
    timeType: "Change Over",
  },
  {
    startTime: "14:15",
    endTime: "14:25",
    scanType: "Down",
    timeType: "Down Time",
  },
];
///// main call sequence
getScanLabelsAsArray(machineData);
getUsageMinutes(scanTypeLabel, machineData);
console.log(scanTypeData);
convertMinutesIntoPercentage(scanTypeData);
console.log(scanTypeDataInPercentage);
////// All Funcations
function convertMinutesIntoPercentage(minutesForAllUsage) {
  for (entry in minutesForAllUsage) {
    var usagePercentage = (minutesForAllUsage[entry] / 540) * 100;
    scanTypeDataInPercentage.push(usagePercentage);
  }
}
function getMinutesFromSplitTimeArray(time) {
  return time[1];
}
function getHourfromSplitTimeArray(time) {
  return time[0];
}
function splitTimeIntoMinutesAndHours(timeToSplit) {
  return timeToSplit.split(":");
}
function getScanLabelsAsArray(allData) {
  for (var scan in allData) {
    createScanTypeLabel(allData[scan].scanType);
  }
}

function getUsageMinutes(allLabels, allData) {
  var totalMinutes = 0;
  for (var label in allLabels) {
    for (var scan in allData) {
      if (allLabels[label] === allData[scan].scanType) {
        var startingTime = splitTimeIntoMinutesAndHours(
          allData[scan].startTime
        );

        var endingTime = splitTimeIntoMinutesAndHours(allData[scan].endTime);

        var startingHour = getHourfromSplitTimeArray(startingTime);

        var startingMinute = getMinutesFromSplitTimeArray(startingTime);

        var endingHour = getHourfromSplitTimeArray(endingTime);
        var endingMinute = parseInt(getMinutesFromSplitTimeArray(endingTime));
        totalMinutes = totalMinutes + (endingMinute - startingMinute);
      }
    }
    scanTypeData.push(totalMinutes);

    totalMinutes = 0;
  }
}

function createScanTypeLabel(scanType) {
  if (!scanTypeLabel.includes(scanType)) {
    scanTypeLabel.push(scanType);
  }
}

const data = {
  labels: scanTypeLabel,
  datasets: [
    {
      label: "Machine Usage Percentage",
      data: scanTypeDataInPercentage,
      backgroundColor: [
        "#ff9800",
        "#009688",
        "#d0021b",
        "#2196f3",
        "#e91e63",
        "#673ab7",
        "#03a9f4",
        "#9c27b0",
        "#607d8b",
        "#4caf50",
      ],
    },
  ],
};

const config = {
  type: "doughnut",
  data: data,
  options: {
    plugins: {
      title: {
        display: true,
        text: "Machine Usage Percentage for Machine: " + machineName,
        font: {
          size: 14,
          family: "Poppins",
        },
      },
    },
  },
};

var myChart = new Chart(document.getElementById("donut-chart"), config);
