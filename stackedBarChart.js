var downTimeData = [];
var usageTimeData = [];
console.log("hain g");
var machineData = [
  {
    startTime: "09:30",
    endTime: "09:50",
    scanType: "Head Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "10:40",
    endTime: "10:50",
    scanType: "Head Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "11:15",
    endTime: "11:30",
    scanType: "Leg Scan",
    timeType: "Down Time",
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
  {
    startTime: "07:15",
    endTime: "07:30",
    scanType: " ",
    timeType: "Down Time",
  },
  {
    startTime: "09:05",
    endTime: "09:30",
    scanType: " ",
    timeType: "Down Time",
  },
];

var object = machineData; // = JSON.parse(JSON.stringify(machineData));

for (var scan in object) {
  if (object[scan].timeType === "Down Time") {
    var startingHours;
    var endingHours;

    startingHours = object[scan].startTime.split(":");
    endingHours = object[scan].endTime.split(":");

    var startingHoursToPush = startingHours[0];
    var endingHoursToPush = endingHours[0];

    if (startingHours[0] === endingHours[0]) {
      downTimeData.push({
        x: startingHoursToPush + ":00",
        y: [startingHours[1], endingHours[1]],
      });
    }
  } else {
    if (object[scan].timeType === "Usage Time") {
      var startingHours;
      var endingHours;

      startingHours = object[scan].startTime.split(":");
      endingHours = object[scan].endTime.split(":");
      var startingHoursToPush = startingHours[0];
      var endingHoursToPush = endingHours[0];

      if (startingHours[0] === endingHours[0]) {
        usageTimeData.push({
          x: startingHoursToPush + ":00",
          y: [startingHours[1], endingHours[1]],
        });
      } else {
        console.log(
          "Start time " +
            startingHours[0] +
            " is not equal to ending hour " +
            endingHours[0]
        );
      }
    }
  }
}
console.log(downTimeData);
var delayed;
new Chart(document.getElementById("stackedbar-chart"), {
  type: "bar",
  data: {
    datasets: [
      {
        label: "Idle Time",

        data: [
          {
            x: "07:00",
          },
          {
            x: "08:00",
          },
          {
            x: "09:00",
          },
          {
            x: "10:00",
          },
          {
            x: "11:00",
          },
          {
            x: "12:00",
          },
          {
            x: "13:00",
          },
        ],
      },
      {
        label: "Machine in use",
        backgroundColor: "lightgreen",
        borderColor: "lightgreen",
        data: usageTimeData,
      },
      {
        label: "Down time",
        backgroundColor: "red",
        borderColor: "red",
        data: downTimeData,
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
