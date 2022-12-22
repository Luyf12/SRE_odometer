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

const TopicBarChart = (interval) => {
  var interval = "month";
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);
    /*****************/
    // Generate data
    var colorList = [
      "#003d5b",
      "#00798c",
      "#d1495b",
      "#edae49",
      "#30638e",
      "#70a288",
      "#d5896f",
      "#dab785",
    ];
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
    var code = [
      6,15,13,20,32,44,39,53,21,15,35,5,19,22,13,19,4,50,12,2,3,6,11,17,2,16,27,8,1,20,7,3,1,15,7,1,
    ];
    var test = [
      24,308,455,395,132,66,43,91,39,22,55,14,63,219,79,117,151,194,158,113,87,39,33,87,7,19,55,30,52,57,8,6,11,5,6,5,
    ];
    var perform = [
      6,45,39,52,70,71,90,83,31,60,51,20,81,55,21,50,65,49,19,16,30,5,10,23,6,17,10,10,1,0,7,1,7,19,6,6,
    ];
    var document = [
      32,48,25,14,8,53,60,81,1,28,18,33,27,34,16,11,30,45,33,37,43,38,46,57,95,61,53,54,68,86,4,17,54,41,6,24,
    ];

    var category1 = [];
    var code1 = [];
    var test1 = [];
    var perform1 = [];
    var document1 = [];
    for (var i = category.length - 1, j = 0; i >= 0; i--, j++) {
      category1[j] = category[i];
      code1[j] = code[i];
      test1[j] = test[i];
      perform1[j] = perform[i];
      document1[j] = document[i];
    }

    var option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // Use axis to trigger tooltip
          type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      title: {
        text: "Top Designed Topics -per month",
        x: "center",
        y: 0,
        textStyle: {
          color: "#B4B4B4",
          fontSize: 16,
          fontWeight: "normal",
        },
      },
      legend: {
        top: "7%",
      },
      grid: {
        left: "3%",
        right: "4%",
        top: "13%",
        bottom: "8%",
        containLabel: true,
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
      yAxis: {
        type: "value",
      },
      xAxis: {
        type: "category",
        data: category1,
      },
      series: [
        {
          name: "test",
          type: "bar",
          stack: "total",
          label: {
            show: false,
          },
          emphasis: {
            focus: "series",
          },
          color: "#003d5b",
          data: test1,
        },
        {
          name: "document",
          type: "bar",
          stack: "total",
          label: {
            show: false,
          },
          emphasis: {
            focus: "series",
          },
          color: "#00798c",
          data: document1,
        },
        {
          name: "perform",
          type: "bar",
          stack: "total",
          label: {
            show: false,
          },
          emphasis: {
            focus: "series",
          },
          color: "#d1495b",
          data: perform1,
        },
        {
          name: "code",
          type: "bar",
          stack: "total",
          label: {
            show: false,
          },
          emphasis: {
            focus: "series",
          },
          color: "#edae49",
          data: code1,
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

export default TopicBarChart;
