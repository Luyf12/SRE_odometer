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
    var code=[0,2,1,2,4,6,5,7,2,2,4,0,2,3,1,2,0,6,1,0,0,0,1,2,0,2,3,1,0,2,0,0,0,2,0,0];
    var test=[13,43,63,55,18,9,6,12,5,3,7,1,8,30,11,16,21,27,22,15,12,5,4,12,0,2,7,4,7,7,1,0,1,0,0,0];
    var perform=[0,6,5,7,9,9,12,11,4,8,7,2,11,7,2,6,9,6,2,2,4,0,1,3,0,2,1,1,0,0,0,0,0,2,0,0];
    var document=[4,6,3,1,1,7,8,11,0,3,2,4,3,4,2,1,4,6,4,5,6,5,6,7,13,8,7,7,9,11,0,2,7,5,0,3];

    var category1=[];
    var code1=[];
    var test1=[];
    var perform1=[];
    var document1=[];
    for(var i=category.length-1,j=0;i>=0;i--,j++){
      category1[j]=category[i];
      code1[j]=code[i];
      test1[j]=test[i];
      perform1[j]=perform[i];
      document1[j]=document[i];
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
