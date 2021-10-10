var workingTime = new Date();
var t = workingTime.getMinutes();
console.log(t);

new Chart(document.getElementById("stackedbar-chart"), {
  type: "bar",
  data: {
    labels: ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00"],
    datasets: [
      {
        label: "Utilization Chart-change over",
        backgroundColor: ["#808080"],
        data: [7],
      },
      {
        label: "Utilization Chart-change over",
        backgroundColor: ["#00FF00"],
        data: [t],
      },
      {
        label: "Utilization Chart-change over",
        backgroundColor: ["#808080"],
        data: [t + 20],
      },

      {
        label: "Utilization Chart- problem time",
        backgroundColor: ["#FF0000"],
        data: [0, 0, 4, 0, 6],
      },
    ],
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "Predicted performance utilization chart of Machines",
    },

    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
});
