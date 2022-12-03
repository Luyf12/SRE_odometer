import { merge } from "lodash";
import moment from "moment";
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box } from "@mui/material";
//
import BaseOptionChart from "./BaseOptionChart";

// ----------------------------------------------------------------------

const IssueFrequency = (data) => {
  var labels = [],
    number = [];
  for (var interval in data) {
    labels.push(interval);
    number.push(data[interval]);
  }
  const CHART_DATA = [
    {
      name: "issue times",
      type: "area",
      data: number,
    },
  ];
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [3, 2] },
    plotOptions: { bar: { columnWidth: "11%", borderRadius: 4 } },
    fill: { type: ["gradient"] },
    labels: labels,
    xaxis: { type: "datetime" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)}`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader title="Issue Frequency" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={CHART_DATA}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
};

export default IssueFrequency;
