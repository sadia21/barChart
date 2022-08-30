import * as utils from "./utils.js";
var scanTypeData = [];
var scanTypeLabel = [];
var scanTypeDataInPercentage = [];
var scanTypeMinutesforGuage = [];
var machineName = "MRI Aleris Danderyd";
var backgroundColorArray = [];

var machineData = [
  {
    startTime: "7:25",
    endTime: "7:30",
    scanType: "Prep Time",
    timeType: "Prep Time",
  },
  {
    startTime: "7:30",
    endTime: "7:50",
    scanType: "Head Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "8:00",
    endTime: "8:05",
    scanType: "Prep Time",
    timeType: "Prep Time",
  },
  {
    startTime: "8:05",
    endTime: "8:30",
    scanType: "Head Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "8:30",
    endTime: "8:35",
    scanType: "Prep Time",
    timeType: "Prep Time",
  },
  {
    startTime: "8:35",
    endTime: "8:60",
    scanType: "Head Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "9:05",
    endTime: "9:10",
    scanType: "Prep Time",
    timeType: "Prep Time",
  },
  {
    startTime: "9:10",
    endTime: "9:25",
    scanType: "Leg Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "9:25",
    endTime: "9:30",
    scanType: "Prep Time",
    timeType: "Prep Time",
  },
  {
    startTime: "9:30",
    endTime: "9:55",
    scanType: "Leg Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "10:05",
    endTime: "10:10",
    scanType: "Prep Time",
    timeType: "Prep Time",
  },
  {
    startTime: "10:10",
    endTime: "10:15",
    scanType: "Leg Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "10:15",
    endTime: "10:20",
    scanType: "Prep Time",
    timeType: "Prep Time",
  },
  {
    startTime: "10:20",
    endTime: "10:55",
    scanType: "Leg Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "11:02",
    endTime: "11:12",
    scanType: "Prep Time",
    timeType: "Prep Time",
  },
  {
    startTime: "11:12",
    endTime: "11:32",
    scanType: "Leg Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "11:32",
    endTime: "11:40",
    scanType: "Prep Time",
    timeType: "Prep Time",
  },
  {
    startTime: "11:40",
    endTime: "11:60",
    scanType: "Spine Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "12:02",
    endTime: "12:15",
    scanType: "Prep Time",
    timeType: "Prep Time",
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
    scanType: "Prep Time",
    timeType: "Prep Time",
  },
  {
    startTime: "12:40",
    endTime: "12:60",
    scanType: "Spine Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "13:00",
    endTime: "13:10",
    scanType: "Prep Time",
    timeType: "Prep Time",
  },
  {
    startTime: "13:10",
    endTime: "13:15",
    scanType: "Spine Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "13:15",
    endTime: "13:35",
    scanType: "Down",
    timeType: "Down Time",
  },
  {
    startTime: "13:35",
    endTime: "13:40",
    scanType: "Prep Time",
    timeType: "Prep Time",
  },
  {
    startTime: "13:40",
    endTime: "13:55",
    scanType: "Spine Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "14:05",
    endTime: "14:15",
    scanType: "Prep Time",
    timeType: "Prep Time",
  },
  {
    startTime: "14:15",
    endTime: "14:25",
    scanType: "Down",
    timeType: "Down Time",
  },
  {
    startTime: "14:25",
    endTime: "14:55",
    scanType: "Shoulder Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "15:25",
    endTime: "15:30",
    scanType: "Prep Time",
    timeType: "Prep Time",
  },
  {
    startTime: "15:30",
    endTime: "15:60",
    scanType: "Spine Scan",
    timeType: "Usage Time",
  },
];

///// main call sequence
getScanLabelsAsArray(machineData);

getUsageMinutes(scanTypeLabel, machineData);

convertMinutesIntoPercentage(scanTypeData);

adjustWithChangeOver();
createBackgroudnColors(scanTypeLabel);

////// All Funcations

function adjustWithChangeOver() {
  let sumOfUsage = scanTypeData.reduce((total, amount) => total + amount);
  let machineFree = Math.round(((540 - sumOfUsage) / 540) * 100);

  scanTypeLabel.push("Free Machine");
  scanTypeDataInPercentage.push(machineFree);
}

function getScanLabelsAsArray(allData) {
  for (var scan in allData) {
    checkScanTypeLabel(allData[scan].scanType);
  }
}
function convertMinutesIntoPercentage(minutesForAllUsage) {
  for (let entry in minutesForAllUsage) {
    const usagePercentage = Math.round((minutesForAllUsage[entry] / 540) * 100);
    scanTypeDataInPercentage.push(usagePercentage);
  }

  return scanTypeDataInPercentage;
}

function getUsageMinutes(allLabels, allData) {
  var totalMinutes = 0;
  for (var label in allLabels) {
    for (var scan in allData) {
      if (allLabels[label] === allData[scan].scanType) {
        var startingTime = utils.splitTime(allData[scan].startTime);

        var endingTime = utils.splitTime(allData[scan].endTime);

        var startingHour = utils.getThehours(startingTime);

        var startingMinute = utils.getTheminutes(startingTime);

        var endingHour = utils.getThehours(endingTime);
        var endingMinute = parseInt(utils.getTheminutes(endingTime));
        totalMinutes = totalMinutes + (endingMinute - startingMinute);
      }
    }

    scanTypeData.push(totalMinutes);
    totalMinutes = 0;
  }
}

function checkScanTypeLabel(scanType) {
  if (!scanTypeLabel.includes(scanType)) {
    scanTypeLabel.push(scanType);
  }
}

function createBackgroudnColors(scanlabels) {
  for (let label in scanlabels) {
    let colorArray = " ";
    switch (scanlabels[label]) {
      case "Prep Time":
        colorArray = "#ffea00";

        break;
      case "Down":
        colorArray = "#ff1744";
        break;
      case "Free Machine":
        colorArray = "#C0C0C0";
        break;
      default:
        colorArray = "#43a047";
    }
    backgroundColorArray.push(colorArray);
  }
}
var percent = 0;
function getGuageChartPercentage() {
  percent = utils.getTotalpercentageOfscanData(
    scanTypeLabel,
    scanTypeDataInPercentage
  );

  return percent;
}
export { getGuageChartPercentage };
const data = {
  labels: scanTypeLabel,
  datasets: [
    {
      label: "Machine Usage Percentage",
      data: scanTypeDataInPercentage,
      backgroundColor: backgroundColorArray,
    },
  ],
};

const config = {
  type: "doughnut",
  data: data,
  options: {
    elements: {
      center: {
        text: "this",
      },
    },
    legend: {
      display: false,
    },
    plugins: {
      title: {
        display: true,
        text: "Machine Usage Percentage for Machine: " + machineName,
        font: {
          size: 14,
          family: "Poppins",
        },
      },
      subtitle: {
        display: true,
        text: "We can add some more information here if needed",
        font: {
          size: 12,
          family: "Poppins",
        },
      },
    },
  },
};

var ctx = document.getElementById("donut-chart").getContext("2d");
var myChart = new Chart(ctx, config);
