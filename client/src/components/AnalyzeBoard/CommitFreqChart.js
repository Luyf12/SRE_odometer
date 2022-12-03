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

const CommitFreqChart = (type, interval) => {
  var interval = "week";
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);
    /*****************/
    // Generate data
    const commitData = {
      weekCommits: [
        { date: "2018-10-21", frequency: 16 },
        { date: "2018-10-28", frequency: 180 },
        { date: "2018-11-04", frequency: 176 },
        { date: "2018-11-11", frequency: 186 },
        { date: "2018-11-18", frequency: 81 },
        { date: "2018-11-25", frequency: 189 },
        { date: "2018-12-02", frequency: 173 },
        { date: "2018-12-09", frequency: 166 },
        { date: "2018-12-16", frequency: 109 },
        { date: "2018-12-23", frequency: 46 },
        { date: "2018-12-30", frequency: 59 },
        { date: "2019-01-06", frequency: 127 },
        { date: "2019-01-13", frequency: 123 },
        { date: "2019-01-20", frequency: 88 },
        { date: "2019-01-27", frequency: 149 },
        { date: "2019-02-03", frequency: 130 },
        { date: "2019-02-10", frequency: 155 },
        { date: "2019-02-17", frequency: 120 },
        { date: "2019-02-24", frequency: 104 },
        { date: "2019-03-03", frequency: 98 },
        { date: "2019-03-10", frequency: 134 },
        { date: "2019-03-17", frequency: 111 },
        { date: "2019-03-24", frequency: 137 },
        { date: "2019-03-31", frequency: 166 },
        { date: "2019-04-07", frequency: 121 },
        { date: "2019-04-14", frequency: 142 },
        { date: "2019-04-21", frequency: 163 },
        { date: "2019-04-28", frequency: 84 },
        { date: "2019-05-05", frequency: 162 },
        { date: "2019-05-12", frequency: 131 },
        { date: "2019-05-19", frequency: 151 },
        { date: "2019-05-26", frequency: 178 },
        { date: "2019-06-02", frequency: 201 },
        { date: "2019-06-09", frequency: 159 },
        { date: "2019-06-16", frequency: 130 },
        { date: "2019-06-23", frequency: 122 },
        { date: "2019-06-30", frequency: 109 },
        { date: "2019-07-07", frequency: 118 },
        { date: "2019-07-14", frequency: 131 },
        { date: "2019-07-21", frequency: 190 },
        { date: "2019-07-28", frequency: 142 },
        { date: "2019-08-04", frequency: 156 },
        { date: "2019-08-11", frequency: 186 },
        { date: "2019-08-18", frequency: 138 },
        { date: "2019-08-25", frequency: 228 },
        { date: "2019-09-01", frequency: 136 },
        { date: "2019-09-08", frequency: 182 },
        { date: "2019-09-15", frequency: 209 },
        { date: "2019-09-22", frequency: 285 },
        { date: "2019-09-29", frequency: 174 },
        { date: "2019-10-06", frequency: 162 },
        { date: "2019-10-13", frequency: 187 },
        { date: "2019-10-20", frequency: 152 },
        { date: "2019-10-27", frequency: 199 },
        { date: "2019-11-03", frequency: 224 },
        { date: "2019-11-10", frequency: 225 },
        { date: "2019-11-17", frequency: 252 },
        { date: "2019-11-24", frequency: 77 },
        { date: "2019-12-01", frequency: 180 },
        { date: "2019-12-08", frequency: 141 },
        { date: "2019-12-15", frequency: 115 },
        { date: "2019-12-22", frequency: 30 },
        { date: "2019-12-29", frequency: 56 },
        { date: "2020-01-05", frequency: 113 },
        { date: "2020-01-12", frequency: 123 },
        { date: "2020-01-19", frequency: 98 },
        { date: "2020-01-26", frequency: 142 },
        { date: "2020-02-02", frequency: 104 },
        { date: "2020-02-09", frequency: 141 },
        { date: "2020-02-16", frequency: 135 },
        { date: "2020-02-23", frequency: 181 },
        { date: "2020-03-01", frequency: 196 },
        { date: "2020-03-08", frequency: 180 },
        { date: "2020-03-15", frequency: 217 },
        { date: "2020-03-22", frequency: 256 },
        { date: "2020-03-29", frequency: 213 },
        { date: "2020-04-05", frequency: 203 },
        { date: "2020-04-12", frequency: 193 },
        { date: "2020-04-19", frequency: 227 },
        { date: "2020-04-26", frequency: 200 },
        { date: "2020-05-03", frequency: 286 },
        { date: "2020-05-10", frequency: 237 },
        { date: "2020-05-17", frequency: 166 },
        { date: "2020-05-24", frequency: 156 },
        { date: "2020-05-31", frequency: 159 },
        { date: "2020-06-07", frequency: 198 },
        { date: "2020-06-14", frequency: 230 },
        { date: "2020-06-21", frequency: 211 },
        { date: "2020-06-28", frequency: 120 },
        { date: "2020-07-05", frequency: 174 },
        { date: "2020-07-12", frequency: 158 },
        { date: "2020-07-19", frequency: 126 },
        { date: "2020-07-26", frequency: 158 },
        { date: "2020-08-02", frequency: 192 },
        { date: "2020-08-09", frequency: 155 },
        { date: "2020-08-16", frequency: 154 },
        { date: "2020-08-23", frequency: 159 },
        { date: "2020-08-30", frequency: 244 },
        { date: "2020-09-06", frequency: 181 },
        { date: "2020-09-13", frequency: 197 },
      ],
      monthCommits: [
        { date: "2018-10", frequency: 136 },
        { date: "2018-11", frequency: 682 },
        { date: "2018-12", frequency: 510 },
        { date: "2019-01", frequency: 503 },
        { date: "2019-02", frequency: 518 },
        { date: "2019-03", frequency: 511 },
        { date: "2019-04", frequency: 635 },
        { date: "2019-05", frequency: 640 },
        { date: "2019-06", frequency: 637 },
        { date: "2019-07", frequency: 636 },
        { date: "2019-08", frequency: 757 },
        { date: "2019-09", frequency: 839 },
        { date: "2019-10", frequency: 805 },
        { date: "2019-11", frequency: 820 },
        { date: "2019-12", frequency: 478 },
        { date: "2020-01", frequency: 508 },
        { date: "2020-02", frequency: 573 },
        { date: "2020-03", frequency: 921 },
        { date: "2020-04", frequency: 923 },
        { date: "2020-05", frequency: 889 },
        { date: "2020-06", frequency: 850 },
        { date: "2020-07", frequency: 668 },
        { date: "2020-08", frequency: 724 },
        { date: "2020-09", frequency: 926 },
        { date: "2020-10", frequency: 746 },
        { date: "2020-11", frequency: 672 },
        { date: "2020-12", frequency: 747 },
        { date: "2021-01", frequency: 710 },
        { date: "2021-02", frequency: 755 },
        { date: "2021-03", frequency: 1022 },
        { date: "2021-04", frequency: 1283 },
        { date: "2021-05", frequency: 1131 },
        { date: "2021-06", frequency: 1022 },
        { date: "2021-07", frequency: 834 },
        { date: "2021-08", frequency: 882 },
        { date: "2021-09", frequency: 812 },
        { date: "2021-10", frequency: 969 },
        { date: "2021-11", frequency: 750 },
        { date: "2021-12", frequency: 750 },
        { date: "2022-01", frequency: 785 },
        { date: "2022-02", frequency: 795 },
        { date: "2022-03", frequency: 921 },
        { date: "2022-04", frequency: 1003 },
        { date: "2022-05", frequency: 1130 },
        { date: "2022-06", frequency: 1192 },
        { date: "2022-07", frequency: 1074 },
        { date: "2022-08", frequency: 1030 },
        { date: "2022-09", frequency: 923 },
        { date: "2022-10", frequency: 1069 },
        { date: "2022-11", frequency: 904 },
      ],
      yearCommits: [
        { date: "2018", frequency: 1328 },
        { date: "2019", frequency: 7779 },
        { date: "2020", frequency: 9147 },
        { date: "2021", frequency: 10920 },
        { date: "2022", frequency: 10826 },
      ],
    };

    interval = localStorage.getItem("commitInterval");
    var date = new Array();
    var frequency = new Array();
    var total = new Array();
    var chartTitle;

    if (interval == "week") {
      chartTitle = "Commits History - per week";
      var sum = 0;
      for (var i = 0; i < commitData.weekCommits.length; i++) {
        date[i] = commitData.weekCommits[i].date;
        frequency[i] = commitData.weekCommits[i].frequency;
        sum += commitData.weekCommits[i].frequency;
        total[i] = sum;
      }
    } else if (interval == "month") {
      chartTitle = "Commits History - per month";
      var sum = 0;
      for (var i = 0; i < commitData.monthCommits.length; i++) {
        date[i] = commitData.monthCommits[i].date;
        frequency[i] = commitData.monthCommits[i].frequency;
        sum += commitData.monthCommits[i].frequency;
        total[i] = sum;
      }
    } else if (interval == "year") {
      chartTitle = "Commits History - per year";
      var sum = 0;
      for (var i = 0; i < commitData.yearCommits.length; i++) {
        date[i] = commitData.yearCommits[i].date;
        frequency[i] = commitData.yearCommits[i].frequency;
        sum += commitData.yearCommits[i].frequency;
        total[i] = sum;
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
        data: ["commits", "total"],
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
          symbolSize: 8,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: "#F02FC2",
            },
          },
          data: total,
        },

        {
          name: "commits",
          type: "bar",
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#956FD4" },
                { offset: 1, color: "#3EACE5" },
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

export default CommitFreqChart;
