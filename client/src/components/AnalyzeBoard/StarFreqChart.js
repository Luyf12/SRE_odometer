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
    //   else{
    //   starData = {
    //     weekStars: [
    //       { date: "2016-08-15", frequency: 3 },
    //       { date: "2016-08-22", frequency: 1 },
    //       { date: "2016-08-29", frequency: 0 },
    //       { date: "2016-09-05", frequency: 0 },
    //       { date: "2016-09-12", frequency: 0 },
    //       { date: "2016-09-19", frequency: 1 },
    //       { date: "2016-09-26", frequency: 0 },
    //       { date: "2016-10-03", frequency: 0 },
    //       { date: "2016-10-10", frequency: 1 },
    //       { date: "2016-10-17", frequency: 2 },
    //       { date: "2016-10-24", frequency: 0 },
    //       { date: "2016-10-31", frequency: 3 },
    //       { date: "2016-11-07", frequency: 0 },
    //       { date: "2016-11-14", frequency: 3 },
    //       { date: "2016-11-21", frequency: 2 },
    //       { date: "2016-11-28", frequency: 1 },
    //       { date: "2016-12-05", frequency: 0 },
    //       { date: "2016-12-12", frequency: 1 },
    //       { date: "2016-12-19", frequency: 2 },
    //       { date: "2016-12-26", frequency: 0 },
    //       { date: "2017-01-02", frequency: 1 },
    //       { date: "2017-01-09", frequency: 4 },
    //       { date: "2017-01-16", frequency: 2169 },
    //       { date: "2017-01-23", frequency: 244 },
    //       { date: "2017-01-30", frequency: 165 },
    //       { date: "2017-02-06", frequency: 182 },
    //       { date: "2017-02-13", frequency: 194 },
    //       { date: "2017-02-20", frequency: 118 },
    //       { date: "2017-02-27", frequency: 131 },
    //       { date: "2017-03-06", frequency: 120 },
    //       { date: "2017-03-13", frequency: 154 },
    //       { date: "2017-03-20", frequency: 101 },
    //       { date: "2017-03-27", frequency: 89 },
    //       { date: "2017-04-03", frequency: 120 },
    //       { date: "2017-04-10", frequency: 114 },
    //       { date: "2017-04-17", frequency: 132 },
    //       { date: "2017-04-24", frequency: 111 },
    //       { date: "2017-05-01", frequency: 204 },
    //       { date: "2017-05-08", frequency: 116 },
    //       { date: "2017-05-15", frequency: 101 },
    //       { date: "2017-05-22", frequency: 81 },
    //       { date: "2017-05-29", frequency: 108 },
    //       { date: "2017-06-05", frequency: 104 },
    //       { date: "2017-06-12", frequency: 73 },
    //       { date: "2017-06-19", frequency: 71 },
    //       { date: "2017-06-26", frequency: 91 },
    //       { date: "2017-07-03", frequency: 81 },
    //       { date: "2017-07-10", frequency: 86 },
    //       { date: "2017-07-17", frequency: 77 },
    //       { date: "2017-07-24", frequency: 98 },
    //       { date: "2017-07-31", frequency: 328 },
    //       { date: "2017-08-07", frequency: 220 },
    //       { date: "2017-08-14", frequency: 140 },
    //       { date: "2017-08-21", frequency: 108 },
    //       { date: "2017-08-28", frequency: 104 },
    //       { date: "2017-09-04", frequency: 221 },
    //       { date: "2017-09-11", frequency: 128 },
    //       { date: "2017-09-18", frequency: 128 },
    //       { date: "2017-09-25", frequency: 102 },
    //       { date: "2017-10-02", frequency: 154 },
    //       { date: "2017-10-09", frequency: 281 },
    //       { date: "2017-10-16", frequency: 209 },
    //       { date: "2017-10-23", frequency: 206 },
    //       { date: "2017-10-30", frequency: 213 },
    //       { date: "2017-11-06", frequency: 219 },
    //       { date: "2017-11-13", frequency: 195 },
    //       { date: "2017-11-20", frequency: 246 },
    //       { date: "2017-11-27", frequency: 188 },
    //       { date: "2017-12-04", frequency: 246 },
    //       { date: "2017-12-11", frequency: 226 },
    //       { date: "2017-12-18", frequency: 236 },
    //       { date: "2017-12-25", frequency: 204 },
    //       { date: "2018-01-01", frequency: 215 },
    //       { date: "2018-01-08", frequency: 253 },
    //       { date: "2018-01-15", frequency: 285 },
    //       { date: "2018-01-22", frequency: 261 },
    //       { date: "2018-01-29", frequency: 192 },
    //       { date: "2018-02-05", frequency: 147 },
    //       { date: "2018-02-12", frequency: 143 },
    //       { date: "2018-02-19", frequency: 179 },
    //       { date: "2018-02-26", frequency: 168 },
    //       { date: "2018-03-05", frequency: 153 },
    //       { date: "2018-03-12", frequency: 173 },
    //       { date: "2018-03-19", frequency: 189 },
    //       { date: "2018-03-26", frequency: 260 },
    //       { date: "2018-04-02", frequency: 291 },
    //       { date: "2018-04-09", frequency: 191 },
    //       { date: "2018-04-16", frequency: 191 },
    //       { date: "2018-04-23", frequency: 363 },
    //       { date: "2018-04-30", frequency: 435 },
    //       { date: "2018-05-07", frequency: 284 },
    //       { date: "2018-05-14", frequency: 232 },
    //       { date: "2018-05-21", frequency: 207 },
    //       { date: "2018-05-28", frequency: 188 },
    //       { date: "2018-06-04", frequency: 202 },
    //       { date: "2018-06-11", frequency: 143 },
    //       { date: "2018-06-18", frequency: 157 },
    //       { date: "2018-06-25", frequency: 178 },
    //       { date: "2018-07-02", frequency: 163 },
    //       { date: "2018-07-09", frequency: 164 },
    //     ],
    //     monthStars: [
    //       { date: "2016-08", frequency: 4 },
    //       { date: "2016-09", frequency: 1 },
    //       { date: "2016-10", frequency: 3 },
    //       { date: "2016-11", frequency: 9 },
    //       { date: "2016-12", frequency: 3 },
    //       { date: "2017-01", frequency: 2441 },
    //       { date: "2017-02", frequency: 647 },
    //       { date: "2017-03", frequency: 538 },
    //       { date: "2017-04", frequency: 499 },
    //       { date: "2017-05", frequency: 561 },
    //       { date: "2017-06", frequency: 379 },
    //       { date: "2017-07", frequency: 375 },
    //       { date: "2017-08", frequency: 837 },
    //       { date: "2017-09", frequency: 616 },
    //       { date: "2017-10", frequency: 916 },
    //       { date: "2017-11", frequency: 915 },
    //       { date: "2017-12", frequency: 1001 },
    //       { date: "2018-01", frequency: 1094 },
    //       { date: "2018-02", frequency: 649 },
    //       { date: "2018-03", frequency: 769 },
    //       { date: "2018-04", frequency: 1159 },
    //       { date: "2018-05", frequency: 1247 },
    //       { date: "2018-06", frequency: 742 },
    //       { date: "2018-07", frequency: 718 },
    //       { date: "2018-08", frequency: 769 },
    //       { date: "2018-09", frequency: 805 },
    //       { date: "2018-10", frequency: 1425 },
    //       { date: "2018-11", frequency: 1107 },
    //       { date: "2018-12", frequency: 1455 },
    //       { date: "2019-01", frequency: 1009 },
    //       { date: "2019-02", frequency: 867 },
    //       { date: "2019-03", frequency: 1113 },
    //       { date: "2019-04", frequency: 1087 },
    //       { date: "2019-05", frequency: 1080 },
    //       { date: "2019-06", frequency: 883 },
    //       { date: "2019-07", frequency: 947 },
    //       { date: "2019-08", frequency: 854 },
    //       { date: "2019-09", frequency: 769 },
    //       { date: "2019-10", frequency: 1224 },
    //       { date: "2019-11", frequency: 844 },
    //       { date: "2019-12", frequency: 906 },
    //       { date: "2020-01", frequency: 682 },
    //       { date: "2020-02", frequency: 787 },
    //       { date: "2020-03", frequency: 903 },
    //       { date: "2020-04", frequency: 906 },
    //       { date: "2020-05", frequency: 902 },
    //       { date: "2020-06", frequency: 773 },
    //       { date: "2020-07", frequency: 850 },
    //       { date: "2020-08", frequency: 842 },
    //       { date: "2020-09", frequency: 88 },
    //     ],
    //     yearStars: [
    //       { date: "2016", frequency: 20 },
    //       { date: "2017", frequency: 9725 },
    //       { date: "2018", frequency: 11939 },
    //       { date: "2019", frequency: 11583 },
    //       { date: "2020", frequency: 6733 },
    //     ],
    //   };
    // }

    //   interval = localStorage.getItem("starInterval");
    //   var date = new Array();
    //   var frequency = new Array();
    //   var total = new Array();
    //   var chartTitle;

    //   if (interval == "week") {
    //     chartTitle = "Stars History - per week";
    //     var sum = 0;
    //     for (var i = 0; i < starData.weekStars.length; i++) {
    //       date[i] = starData.weekStars[i].date;
    //       frequency[i] = starData.weekStars[i].frequency;
    //       sum += starData.weekStars[i].frequency;
    //       total[i] = sum;
    //     }
    //   } else if (interval == "month") {
    //     chartTitle = "Stars History - per month";
    //     var sum = 0;
    //     for (var i = 0; i < starData.monthStars.length; i++) {
    //       date[i] = starData.monthStars[i].date;
    //       frequency[i] = starData.monthStars[i].frequency;
    //       sum += starData.monthStars[i].frequency;
    //       total[i] = sum;
    //     }
    //   } else if (interval == "year") {
    //     chartTitle = "Stars History - per year";
    //     var sum = 0;
    //     for (var i = 0; i < starData.yearStars.length; i++) {
    //       date[i] = starData.yearStars[i].date;
    //       frequency[i] = starData.yearStars[i].frequency;
    //       sum += starData.yearStars[i].frequency;
    //       total[i] = sum;
    //     }
    //   }

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
