import { useEffect, useRef } from "react";
import {
  Box,
  Card,
  Typography,
  CardHeader,
  Chip,
  AppBar,
  Stack,
  Toolbar,
  Button,
} from "@mui/material";
import * as echarts from "echarts";

const StarFreqChart = (data) => {
  var interval = "week";
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);
    /*****************/
    // Generate data
    interval = localStorage.getItem("starInterval");
    var date = new Array();
    var frequency = new Array();
    var total = new Array();
    var chartTitle;

    var starData = new Array();
    if (data.data.data != null) {
      starData = data.data.data;
      if (interval == "week") {
        chartTitle = "Stars History - per week";
        var sum = 0;
        for (var i = 0; i < starData.weekStars.length; i++) {
          date[i] = starData.weekStars[i].date;
          frequency[i] = starData.weekStars[i].frequency;
          sum += starData.weekStars[i].frequency;
          total[i] = sum;
        }
      } else if (interval == "month") {
        chartTitle = "Stars History - per month";
        var sum = 0;
        for (var i = 0; i < starData.monthStars.length; i++) {
          date[i] = starData.monthStars[i].date;
          frequency[i] = starData.monthStars[i].frequency;
          sum += starData.monthStars[i].frequency;
          total[i] = sum;
        }
      } else if (interval == "year") {
        chartTitle = "Stars History - per year";
        var sum = 0;
        for (var i = 0; i < starData.yearStars.length; i++) {
          date[i] = starData.yearStars[i].date;
          frequency[i] = starData.yearStars[i].frequency;
          sum += starData.yearStars[i].frequency;
          total[i] = sum;
        }
      }
    }

    // option
    const option = {
      title: {
        text: chartTitle,
        x: "center",
        y: 0,
        textStyle: {
          color: "#B4B4B4",
          fontSize: 16,
          fontWeight: "normal",
        },
      },
      backgroundColor: "#FFF",
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(255,255,255,0.1)",
        axisPointer: {
          type: "shadow",
          label: {
            show: true,
            backgroundColor: "#7B7DDC",
          },
        },
      },
      legend: {
        data: ["stars", "total"],
        textStyle: {
          color: "#B4B4B4",
        },
        top: "7%",
      },
      grid: {
        x: "12%",
        width: "82%",
        y: "12%",
      },
      xAxis: {
        data: date,
        axisLine: {
          lineStyle: {
            color: "#B4B4B4",
          },
        },
        axisTick: {
          show: false,
        },
      },
      dataZoom: [
        {
          show: true,
          height: 25,
          xAxisIndex: [0],
          bottom: 15,
          start: 0,
          end: 100,
          handleIcon:
            "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
          handleSize: "110%",
          handleStyle: {
            color: "#d3dee5",
          },
          textStyle: {
            color: "#fff",
          },
          borderColor: "#90979c",
        },
      ],
      yAxis: [
        {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#B4B4B4",
            },
          },

          axisLabel: {
            formatter: "{value} ",
          },
        },
        {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#B4B4B4",
            },
          },
          axisLabel: {
            formatter: "{value} ",
          },
        },
      ],

      series: [
        {
          name: "total",
          type: "line",
          smooth: true,
          showAllSymbol: true,
          symbol: "emptyCircle",
          symbolSize: 0,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: "#B983FF",
            },
          },
          lineStyle: { width: 3 },
          data: total,
        },

        {
          name: "stars",
          type: "bar",
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 3,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#47B5FF" },
                { offset: 1, color: "#1363DF" },
              ]),
            },
          },
          data: frequency,
        },
      ],
    };

    /*****************/
    chartInstance.setOption(option);
  }, []);
  return (
    <Card>
      <Box sx={{ mx: 3 }} dir="ltr">
        <div style={{ textAlign: "center" }}>
          <h2></h2>
          <div ref={chartRef} style={{ height: "600px" }}></div>
        </div>
      </Box>
    </Card>
  );
};

export default StarFreqChart;
