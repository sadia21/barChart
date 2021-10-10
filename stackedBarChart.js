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
