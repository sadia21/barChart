var scanTypeData = [];
var scanTypeLabel = [];
var counts = {};
var lengthofscan = [];
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
    startTime: "12:40",
    endTime: "12:60",
    scanType: "Spine Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "13:15",
    endTime: "13:45",
    scanType: " ",
    timeType: "Down Time",
  },
  {
    startTime: "14:15",
    endTime: "14:50",
    scanType: " ",
    timeType: "Down Time",
  },
];
//console.log(machineData.length);
function getMinutesFromSplitTimeArray(time) {
  return time[1];
}
function getHourfromSplitTimeArray(time) {
  return time[0];
}
function splitTimeIntoMinutesAndHours(timeToSplit) {
  return timeToSplit.split(":");
}
for (var scan in machineData) {
  var startingTime = splitTimeIntoMinutesAndHours(machineData[scan].startTime);

  var endingTime = splitTimeIntoMinutesAndHours(machineData[scan].endTime);

  var startingHour = getHourfromSplitTimeArray(startingTime);

  var startingMinute = getMinutesFromSplitTimeArray(startingTime);

  var endingHour = getHourfromSplitTimeArray(endingTime);
  var endingMinute = getMinutesFromSplitTimeArray(endingTime);
  if (startingHour === endingHour) {
    var timecal = endingMinute - startingMinute;
    lengthofscan.push(timecal);
  }
  createScanTypeLabel(machineData[scan].scanType);
  var addAllMinutes = 0;
  for (let i = 0; i < scanTypeLabel.length; i++) {
    for (let j = 0; j < machineData.length; j++) {
      if (scanTypeLabel[i] === machineData[j].scanType) {
        addAllMinutes = addAllMinutes + lengthofscan[j];
      }
    }
    scanTypeData.push(addAllMinutes);
  }
}

console.log(lengthofscan);
console.log("Scan Type Data " + scanTypeData);
function createScanTypeLabel(scanType) {
  if (!scanTypeLabel.includes(scanType)) {
    var scanTypes = scanType;

    if (scanTypes === " ") {
      //scanTypes = machineData[scan].timeType;
      scanTypeLabel.push(scanTypes);
    } else {
      scanTypeLabel.push(scanTypes);
    }
  }
}
console.log(scanTypeLabel);
console.log(scanTypeLabel[2]);
console.log(machineData[2].scanType);

scanTypeLabel.forEach((x) => {
  counts[x] = (counts[x] || 0) + 1;
});
//console.log(counts);
const data = {
  labels: scanTypeLabel,
  datasets: [
    {
      label: "Machine Usage Percentage",
      data: [3, 54, 34, 15, 45],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(75, 192, 192)",
        "rgb(255, 205, 86)",
        "rgb(225, 205, 186)",
        "rgb(55, 120, 60)",
      ],
    },
  ],
};

const config = {
  type: "doughnut",
  data: data,
  options: {},
};

var myChart = new Chart(document.getElementById("donut-chart"), config);
