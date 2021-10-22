google.charts.load("current", { packages: ["gauge"] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    // let utalizationvalue = call the function to assign utilaztion value
    // and then replace the utalizaion value on line 8 with variabel above
    ["Label", "Value"],
    ["Utilization", 77],
  ]);

  var options = {
    redFrom: 0,
    redTo: 33,
    yellowFrom: 33,
    yellowTo: 66,
    greenFrom: 66,
    greenTo: 100,
    minorTicks: 5,
  };

  var chart = new google.visualization.Gauge(
    document.getElementById("chart_div")
  );

  chart.draw(data, options);

  //   setInterval(function () {
  //     data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
  //     chart.draw(data, options);
  //   }, 13000);
}
