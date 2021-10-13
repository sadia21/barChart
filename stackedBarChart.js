var machineDowntimeData = [];
var machineUsedTimeData = [];
var todaysDate = new Date().toISOString().split("T")[0];

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
for (var scan in machineData) {
  var startingTime = machineData[scan].startTime.split(":");
  var endingTime = machineData[scan].endTime.split(":");
  var startingHour = startingTime[0];

  var startingMinute = startingTime[1];
  var endingHour = endingTime[0];

  var endingMinute = endingTime[1];

  if (machineData[scan].timeType === "Down Time") {
    if (startingHour === endingHour) {
      machineDowntimeData.push({
        x: startingHour + ":00",
        y: [startingMinute, endingMinute],
      });
    }
  }
  if (machineData[scan].timeType === "Usage Time") {
    if (startingHour === endingHour) {
      machineUsedTimeData.push({
        x: startingHour + ":00",
        y: [startingMinute, endingMinute],
      });
    }
  }
}
var delayed;
new Chart(document.getElementById("stackedbar-chart"), {
  type: "bar",
  data: {
    datasets: [
      {
        data: [
          {
            x: "7:00",
          },
          {
            x: "8:00",
          },
          {
            x: "9:00",
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
          {
            x: "14:00",
          },
          {
            x: "15:00",
          },
          {
            x: "16:00",
          },
          {
            x: "17:00",
          },
          {
            x: "18:00",
          },
        ],
      },
      {
        label: "Machine in use",
        backgroundColor: "lightgreen",
        borderColor: "lightgreen",
        data: machineUsedTimeData,
      },
      {
        label: "Down time",
        backgroundColor: "red",
        borderColor: "red",
        data: machineDowntimeData,
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Machine Usage over time for: " + todaysDate,
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
