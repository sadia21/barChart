var downTimeData = [];
console.log("hain g");
var machineData = [
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
var object = machineData; // = JSON.parse(JSON.stringify(machineData));

for (var scan in object) {
  if (object[scan].timeType === "Down Time") {
    console.log("This is a downtime ");
    var startingHours;
    var endingHours;
    console.log(object[scan].startTime);
    startingHours = object[scan].startTime.split(":");
    endingHours = object[scan].endTime.split(":");
    var startingHoursToPush = startingHours[0];
    var endingHoursToPush = endingHours[0];

    if (startingHours[0] === endingHours[0]) {
      downTimeData.push({
        x: startingHoursToPush + ":00",
        y: startingHours[1] + "," + endingHours[1],
      });

      console.log("data pushed = " + startingHoursToPush);
    }
  }
  console.log(downTimeData);
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
