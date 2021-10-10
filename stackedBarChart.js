var machineDowntimeData;
var machineUsedTimeData;
machineData = [
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
    startTime: "11:45",
    endTime: "12:10",
    scanType: "Spine Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "12:15",
    endTime: "12:30",
    scanType: " ",
    timeType: "Down Time",
  },
];
for (var scan in machineData) {
  var startingTime = machineData[scan].startTime.split(":"); //console.log(startingTime);
  var startingHour = startingTime[0]; //console.log(startingHour);
  var startingMinute = startingTime[1]; //console.log(startingMinute);
  var endingTime = machineData[scan].endTime.split(":"); //console.log(endingTime);
  var endingHour = endingTime[0]; //console.log(endingHour);
  var endingMinute = endingTime[1]; //console.log(endingMinute);
  var scanTypes = machineData[scan].scanType;
  var timeTypes = machineData[scan].timeType;
}
var delayed;
new Chart(document.getElementById("stackedbar-chart"), {
  type: "bar",
  data: {
    datasets: [
      {
        label: "Machine in use",
        backgroundColor: "lightgreen",
        borderColor: "lightgreen",
        data: [
          {
            x: "7:00",
            y: [50, 60],
          },
          {
            x: "7:00",
            y: [20, 40],
          },
          {
            x: "8:00",
            y: [8, 21],
          },
          {
            x: "8:00",
            y: [34, 41],
          },
          {
            x: "8:00",
            y: [47, 57],
          },
          {
            x: "9:00",
            y: [50, 60],
          },
          {
            x: "10:00",
            y: [30, 43],
          },
        ],
      },
      {
        label: "Down time",
        backgroundColor: "red",
        borderColor: "red",
        data: [
          {
            x: "10:00",
            y: [10, 18],
          },
          {
            x: "9:00",
            y: [20, 50],
          },
        ],
      },
    ],
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "Predicted performance utilization chart of Machines",
    },

    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    x: {
      stacked: true,
    },

    y: {},
  },
});
