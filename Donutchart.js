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
    startTime: "7:00",
    endTime: "7:25",
    scanType: "Shoulder Scan",
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
    startTime: "10:00",
    endTime: "10:25",
    scanType: "Leg Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "10:30",
    endTime: "10:55",
    scanType: "Leg Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "11:02",
    endTime: "11:12",
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
    startTime: "12:02",
    endTime: "12:12",
    scanType: "Head Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "12:15",
    endTime: "12:30",
    scanType: "Head Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "12:40",
    endTime: "12:60",
    scanType: "Spine Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "13:00",
    endTime: "13:15",
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
    startTime: "13:27",
    endTime: "13:55",
    scanType: "Spine Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "14:0",
    endTime: "14:15",
    scanType: "Shoulder Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "14:15",
    endTime: "14:25",
    scanType: "Down",
    timeType: "Down Time",
  },
  {
    startTime: "14:30",
    endTime: "14:55",
    scanType: "Shoulder Scan",
    timeType: "Usage Time",
  },
];
///// main call sequence
getScanLabelsAsArray(machineData);
console.log(scanTypeLabel);
getUsageMinutes(scanTypeLabel, machineData);

convertMinutesIntoPercentage(scanTypeData);
//console.log(scanTypeDataInPercentage);
adjustWithChangeOver();
////// All Funcations
var sumOfUsage = scanTypeData.reduce((total, amount) => total + amount);

function adjustWithChangeOver() {
  let sumOfUsage = scanTypeData.reduce((total, amount) => total + amount);
  let machineFree = Math.round(((540 - sumOfUsage) / 540) * 100);

  scanTypeLabel.push("Free Machine");
  scanTypeDataInPercentage.push(machineFree);
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
  //scanTypeLabel.push("Free of Use");
}
function convertMinutesIntoPercentage(minutesForAllUsage) {
  for (entry in minutesForAllUsage) {
    const usagePercentage = Math.round((minutesForAllUsage[entry] / 540) * 100);

    scanTypeDataInPercentage.push(usagePercentage);
  }
  // console.log(scanTypeDataInPercentage);
  // scanTypeDataInPercentage.push(adjustWithChangeOver());
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
console.log(scanTypeLabel);
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
        "lightgreen",
        "lightgreen",
        "lightgreen",
        "lightgreen",
        "red",
        "grey",
        "#d0021b",
        "#03a9f4",
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

//var myChart = new Chart(document.getElementById("donut-chart"), config);
var cv = document.getElementById("donut-chart");
var ctx = cv.getContext("2d");
var myChart = new Chart(ctx, config);
cv.onclick = function (e) {
  const points = myChart.getElementsAtEventForMode(
    e,
    "nearest",
    { intersect: true },
    true
  );
  if (points.length) {
    const firstPoint = points[0];
    const value = window.open("https://upptimely.com/#whoweare", "_blank");
  }
};
