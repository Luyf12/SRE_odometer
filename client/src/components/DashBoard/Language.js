import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
import { useTheme, styled } from "@mui/material/styles";
import { Card, CardHeader } from "@mui/material";
import { fNumber } from "../../utils/formatNumber";
import BaseOptionChart from "./BaseOptionChart";

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

const Language = (data) => {
  const theme = useTheme();
  var labels = [];
  var size = [];
  var count = 0,
    sum = 0;
  for (var language in data) {
    if (count < 3) {
      labels.push(language);
      size.push(data[language]);
    } else {
      sum += data[language];
    }
    count += 1;
  }
  labels.push("other");
  size.push(sum);
  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ],
    labels: labels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: "center" },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  return (
    <Card>
      <CardHeader title="Language" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart
          type="pie"
          series={size}
          options={chartOptions}
          height={290}
        />
      </ChartWrapperStyle>
    </Card>
  );
};

export default Language;
