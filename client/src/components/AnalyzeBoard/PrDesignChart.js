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
    var design = [
      93,442,549,512,268,268,245,325,124,157,169,87,194,359,162,211,276,357,233,186,167,123,111,204,115,142,155,124,147,177,34,49,77,97,57,49,
    ];
    var nondesign = [
      588,1525,1444,1343,1291,1314,1661,1334,1000,855,813,771,618,785,841,912,1112,807,1119,1177,1510,1259,948,826,840,865,671,652,540,521,576,677,648,648,423,346,
    ];
    var total=[680,1967,1993,1855,1559,1583,1906,1659,1125,1012,982,858,813,1144,1004,1124,1388,1164,1351,1363,1676,1383,1059,1031,955,1007,826,776,687,698,610,726,725,745,480,396];
    var category1=[];
    var design1=[];
    var nondesign1=[];
    var sum=0;
    for(var i=category.length-1,j=0;i>=0;i--,j++){
      category1[j]=category[i];
      design1[j]=design[i];
      nondesign1[j]=nondesign[i];
      sum+=design[i]+nondesign[i];
      total[j]=sum;
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
          name: "Designed",
          type: "bar",
          stack: "total",
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 3,
              color: "#051367",
            },
          },
          data: design1,
        },

        {
          name: "Non-Desighed",
          type: "bar",
          stack: "total",
          barGap: "-100%",
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 3,
              color: "#47B5FF",
            },
          },

          data: nondesign1,
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
