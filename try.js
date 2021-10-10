var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    datasets: [
      {
        label: "dataset",
        backgroundColor: "red",
        borderColor: "red",
        data: [
          {
            x: "2020-05-01",
            y: [50, 100],
          },
          {
            x: "2020-05-02",
            y: [50, 100],
          },
          {
            x: "2020-05-03",
            y: [50, 100],
          },
          {
            x: "2020-05-04",
            y: [50, 100],
          },
        ],
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: "time",
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Date",
        },
        time: {
          unit: "day",
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "value",
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  },
});
