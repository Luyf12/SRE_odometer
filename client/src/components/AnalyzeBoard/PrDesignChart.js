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

const PrDesignChart = (interval) => {
  var interval = "month";
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);
    /*****************/
    // Generate data
    var category = [
      "22-Dec",
      "22-Nov",
      "22-Oct",
      "22-Sep",
      "22-Aug",
      "22-Jul",
      "22-Jun",
      "22-May",
      "22-Apr",
      "22-Mar",
      "22-Feb",
      "22-Jan",
      "21-Dec",
      "21-Nov",
      "21-Oct",
      "21-Sep",
      "21-Aug",
      "21-Jul",
      "21-Jun",
      "21-May",
      "21-Apr",
      "21-Mar",
      "21-Feb",
      "21-Jan",
      "20-Dec",
      "20-Nov",
      "20-Oct",
      "20-Sep",
      "20-Aug",
      "20-Jul",
      "20-Jun",
      "20-May",
      "20-Apr",
      "20-Mar",
      "20-Feb",
      "20-Jan",
    ];
    var barData = [
      172, 556, 717, 646, 303, 303, 263, 354, 91, 152, 202, 71, 242, 434, 162,
      242, 343, 455, 283, 222, 222, 101, 111, 242, 131, 121, 172, 121, 162, 202,
      10, 20, 81, 71, 0, 30,
    ];
    var lineData = [
      1733, 4952, 4863, 4548, 4062, 4128, 5075, 4291, 3058, 2682, 2548, 2332,
      2033, 2769, 2648, 2904, 3542, 2803, 3501, 3593, 4472, 3770, 2855, 2644,
      2542, 2698, 2142, 2051, 1762, 1752, 1699, 2014, 1950, 2015, 1344, 1078,
    ];
    var category1=[];
    var barData1=[];
    var lineData1=[];
    for(var i=category.length-1,j=0;i>=0;i--,j++){
      category1[j]=category[i];
      barData1[j]=barData[i];
      lineData1[j]=lineData[i];
    }

    // option
    var option = {
      title: {
        text: "Designed and Non-Designed Pull Requests",
        x: "center",
        y: 0,
        textStyle: {
          color: "#B4B4B4",
          fontSize: 16,
          fontWeight: "normal",
        },
      },
      backgroundColor: "#fff",
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
        data: ["Designed", "Non-Desighed"],
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
      xAxis: {
        data: category1,
        axisLine: {
          lineStyle: {
            color: "#B4B4B4",
          },
        },
        axisTick: {
          show: false,
        },
      },
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
          name: "Designed",
          type: "bar",
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0.5, color: "#956FD4" },
                { offset: 1, color: "#3EACE5" },
              ]),
            },
          },
          data: barData1,
        },

        {
          name: "Non-Desighed",
          type: "bar",
          barGap: "-100%",
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(156,107,211,0.5)" },
                { offset: 0.2, color: "rgba(156,107,211,0.35)" },
                { offset: 1, color: "rgba(156,107,211,0.2)" },
              ]),
            },
          },
          z: -12,

          data: lineData1,
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

export default PrDesignChart;
