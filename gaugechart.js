import { getTotalpercentageOfscanData } from "./utils.js";
import { getGuageChartPercentage } from "./donutchart.js";

google.charts.load("current", { packages: ["gauge"] });
google.charts.setOnLoadCallback(drawChart);

var percentage = getGuageChartPercentage();
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    // let utalizationvalue = call the function to assign utilaztion value
    // and then replace the utalizaion value on line 8 with variabel above
    ["Label", "Value"],
    ["Utilization", percentage],
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
}
