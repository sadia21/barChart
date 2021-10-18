var machinePreptimeData = [];
var machineDowntimeData = [];
var machineUsedTimeData = [];
var todaysDate = new Date().toISOString().split("T")[0];

machineData = [
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
    endTime: "8:10",
    scanType: "Prep Time",
    timeType: "Prep Time",
  },
  {
    startTime: "8:10",
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
    endTime: "9:15",
    scanType: "Prep Time",
    timeType: "Prep Time",
  },
  {
    startTime: "9:15",
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
    endTime: "13:20",
    scanType: "Spine Scan",
    timeType: "Usage Time",
  },
  {
    startTime: "13:20",
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
];
function splitTime(timetoSplit) {
  return timetoSplit.split(":");
}
function getThehours(spliteddata) {
  return spliteddata[0];
}
function getTheminutes(spliteddata) {
  return spliteddata[1];
}
function concateHour(hours) {
  return hours + ":00";
}

for (var scan in machineData) {
  var startingTime = splitTime(machineData[scan].startTime);
  var endingTime = splitTime(machineData[scan].endTime);

  var startingHour = getThehours(startingTime);
  var startingMinute = getTheminutes(startingTime);
  var endingHour = getThehours(endingTime);
  var endingMinute = getTheminutes(endingTime);

  if (machineData[scan].timeType === "Prep Time") {
    if (startingHour === endingHour) {
      machinePreptimeData.push({
        x: concateHour(startingHour),
        y: [startingMinute, endingMinute],
      });
    }
  }
  if (machineData[scan].timeType === "Down Time") {
    if (startingHour === endingHour) {
      machineDowntimeData.push({
        x: concateHour(startingHour),
        y: [startingMinute, endingMinute],
      });
    }
  }
  if (machineData[scan].timeType === "Usage Time") {
    if (startingHour === endingHour) {
      machineUsedTimeData.push({
        x: concateHour(startingHour),
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
        label: "Machine in Prepare",
        backgroundColor: "#ffea00",
        borderColor: "#ffea00",
        data: machinePreptimeData,
      },
      {
        label: "Machine in use",
        backgroundColor: "#43a047",
        borderColor: "#43a047",
        data: machineUsedTimeData,
      },
      {
        label: "Down time",
        backgroundColor: "#ff1744",
        borderColor: "#ff1744",
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
