// STEP 1 - Include Dependencies
// Include react
import React from "react";


// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);


// STEP 3 - Creating the JSON object to store the chart configurations


const ChartComponent = ({data}) => {
  const chartConfigs = {
  type: "column3d", // The chart type
  width: "100%", // Width of the chart
  height: "400", // Height of the chart
  dataFormat: "json", // Data type
  dataSource: {
    // Chart Configuration
    chart: {
     caption: "Populairste programmeertaal",
     yAxisName: "Sterren",
     yAxisNameFontSize: "16px",
     xAxisName: "Projecten",
     xAxisNameFontSize: "16px",
     paletteColors: "#dd4b25, #254bdd, #f7df1e,#71a75c,#9b4f97, #607ebe, #892424, #96d78f, #03fcd7, #fc0398 "
     
     
    },
    // Chart Data
    data,
  }
};
  return (<ReactFC {...chartConfigs} />);
}

export default ChartComponent;
