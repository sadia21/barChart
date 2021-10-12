var scantypedta = [];
var counts = {};
machineData = [
  {
    startTime: "7:30",
    endTime: "7:50",
    scanType: "Head Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "10:30",
    endTime: "10:50",
    scanType: "Head Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "11:15",
    endTime: "11:30",
    scanType: "Leg Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "16:15",
    endTime: "16:30",
    scanType: "Leg Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "11:45",
    endTime: "12:10",
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
    startTime: "11:15",
    endTime: "12:30",
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
console.log(machineData.length);

for (var scan in machineData) {
  var startingTime = machineData[scan].startTime.split(":");
  var endingTime = machineData[scan].endTime.split(":");
  var startingHour = startingTime[0];

  var startingMinute = startingTime[1];
  var endingHour = endingTime[0];

  var endingMinute = endingTime[1];
  //console.log(endingMinute);
  var scanTypes = machineData[scan].scanType;
  scantypedta.push(scanTypes);

  if (startingHour === endingHour) {
    var lengthOfScan = endingMinute - startingMinute;
    //console.log(lengthOfScan);
  }
}
//console.log(scantypedta);
scantypedta.forEach((x) => {
  counts[x] = (counts[x] || 0) + 1;
});
//console.log(counts);
const data = {
  labels: ["Head", "Leg", "Spine"],
  datasets: [
    {
      label: "My First Dataset",
      data: [3, 54, 34],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(75, 192, 192)",
        "rgb(255, 205, 86)",
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
