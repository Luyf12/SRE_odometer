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

const IssueFreqChart = (type, interval) => {
  var interval = "week";
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);
    /*****************/
    // Generate data
    const issueData = {
      weekIssues: [
        { date: "2020-12-13", frequency: 41 },
        { date: "2020-12-20", frequency: 218 },
        { date: "2020-12-27", frequency: 132 },
        { date: "2021-01-03", frequency: 324 },
        { date: "2021-01-10", frequency: 329 },
        { date: "2021-01-17", frequency: 340 },
        { date: "2021-01-24", frequency: 422 },
        { date: "2021-01-31", frequency: 423 },
        { date: "2021-02-07", frequency: 413 },
        { date: "2021-02-14", frequency: 307 },
        { date: "2021-02-21", frequency: 413 },
        { date: "2021-02-28", frequency: 483 },
        { date: "2021-03-07", frequency: 503 },
        { date: "2021-03-14", frequency: 407 },
        { date: "2021-03-21", frequency: 454 },
        { date: "2021-03-28", frequency: 444 },
        { date: "2021-04-04", frequency: 462 },
        { date: "2021-04-11", frequency: 590 },
        { date: "2021-04-18", frequency: 542 },
        { date: "2021-04-25", frequency: 548 },
        { date: "2021-05-02", frequency: 476 },
        { date: "2021-05-09", frequency: 453 },
        { date: "2021-05-16", frequency: 453 },
        { date: "2021-05-23", frequency: 369 },
        { date: "2021-05-30", frequency: 337 },
        { date: "2021-06-06", frequency: 398 },
        { date: "2021-06-13", frequency: 417 },
        { date: "2021-06-20", frequency: 491 },
        { date: "2021-06-27", frequency: 386 },
        { date: "2021-07-04", frequency: 289 },
        { date: "2021-07-11", frequency: 303 },
        { date: "2021-07-18", frequency: 342 },
        { date: "2021-07-25", frequency: 385 },
        { date: "2021-08-01", frequency: 405 },
        { date: "2021-08-08", frequency: 337 },
        { date: "2021-08-15", frequency: 443 },
        { date: "2021-08-22", frequency: 411 },
        { date: "2021-08-29", frequency: 371 },
        { date: "2021-09-05", frequency: 374 },
        { date: "2021-09-12", frequency: 418 },
        { date: "2021-09-19", frequency: 354 },
        { date: "2021-09-26", frequency: 395 },
        { date: "2021-10-03", frequency: 317 },
        { date: "2021-10-10", frequency: 385 },
        { date: "2021-10-17", frequency: 390 },
        { date: "2021-10-24", frequency: 442 },
        { date: "2021-10-31", frequency: 368 },
        { date: "2021-11-07", frequency: 358 },
        { date: "2021-11-14", frequency: 375 },
        { date: "2021-11-21", frequency: 266 },
        { date: "2021-11-28", frequency: 453 },
        { date: "2021-12-05", frequency: 385 },
        { date: "2021-12-12", frequency: 353 },
        { date: "2021-12-19", frequency: 244 },
        { date: "2021-12-26", frequency: 143 },
        { date: "2022-01-02", frequency: 513 },
        { date: "2022-01-09", frequency: 298 },
        { date: "2022-01-16", frequency: 320 },
        { date: "2022-01-23", frequency: 361 },
        { date: "2022-01-30", frequency: 348 },
        { date: "2022-02-06", frequency: 379 },
        { date: "2022-02-13", frequency: 379 },
        { date: "2022-02-20", frequency: 330 },
        { date: "2022-02-27", frequency: 352 },
        { date: "2022-03-06", frequency: 309 },
        { date: "2022-03-13", frequency: 294 },
        { date: "2022-03-20", frequency: 366 },
        { date: "2022-03-27", frequency: 346 },
        { date: "2022-04-03", frequency: 426 },
        { date: "2022-04-10", frequency: 363 },
        { date: "2022-04-17", frequency: 330 },
        { date: "2022-04-24", frequency: 349 },
        { date: "2022-05-01", frequency: 412 },
        { date: "2022-05-08", frequency: 457 },
        { date: "2022-05-15", frequency: 559 },
        { date: "2022-05-22", frequency: 412 },
        { date: "2022-05-29", frequency: 419 },
        { date: "2022-06-05", frequency: 474 },
        { date: "2022-06-12", frequency: 487 },
        { date: "2022-06-19", frequency: 440 },
        { date: "2022-06-26", frequency: 509 },
        { date: "2022-07-03", frequency: 375 },
        { date: "2022-07-10", frequency: 428 },
        { date: "2022-07-17", frequency: 463 },
        { date: "2022-07-24", frequency: 471 },
        { date: "2022-07-31", frequency: 398 },
        { date: "2022-08-07", frequency: 432 },
        { date: "2022-08-14", frequency: 430 },
        { date: "2022-08-21", frequency: 360 },
        { date: "2022-08-28", frequency: 345 },
        { date: "2022-09-04", frequency: 306 },
        { date: "2022-09-11", frequency: 397 },
        { date: "2022-09-18", frequency: 374 },
        { date: "2022-09-25", frequency: 460 },
        { date: "2022-10-02", frequency: 477 },
        { date: "2022-10-09", frequency: 482 },
        { date: "2022-10-16", frequency: 538 },
        { date: "2022-10-23", frequency: 479 },
        { date: "2022-10-30", frequency: 505 },
        { date: "2022-11-06", frequency: 409 },
      ],
      monthIssues: [
        { date: "2020-12", frequency: 376 },
        { date: "2021-01", frequency: 1445 },
        { date: "2021-02", frequency: 1551 },
        { date: "2021-03", frequency: 2117 },
        { date: "2021-04", frequency: 2285 },
        { date: "2021-05", frequency: 1825 },
        { date: "2021-06", frequency: 1845 },
        { date: "2021-07", frequency: 1450 },
        { date: "2021-08", frequency: 1783 },
        { date: "2021-09", frequency: 1631 },
        { date: "2021-10", frequency: 1639 },
        { date: "2021-11", frequency: 1566 },
        { date: "2021-12", frequency: 1365 },
        { date: "2022-01", frequency: 1543 },
        { date: "2022-02", frequency: 1459 },
        { date: "2022-03", frequency: 1492 },
        { date: "2022-04", frequency: 1572 },
        { date: "2022-05", frequency: 1968 },
        { date: "2022-06", frequency: 2150 },
        { date: "2022-07", frequency: 1805 },
        { date: "2022-08", frequency: 1809 },
        { date: "2022-09", frequency: 1655 },
        { date: "2022-10", frequency: 2117 },
        { date: "2022-11", frequency: 1552 },
      ],
      yearIssues: [
        { date: "2020", frequency: 376 },
        { date: "2021", frequency: 20502 },
        { date: "2022", frequency: 19122 },
      ],
    };

    interval = localStorage.getItem("issueInterval");
    var date = new Array();
    var frequency = new Array();
    var total = new Array();
    var chartTitle;

    if (interval == "week") {
      chartTitle = "Issues History - per week";
      var sum = 0;
      for (var i = 0; i < issueData.weekIssues.length; i++) {
        date[i] = issueData.weekIssues[i].date;
        frequency[i] = issueData.weekIssues[i].frequency;
        sum += issueData.weekIssues[i].frequency;
        total[i] = sum;
      }
    } else if (interval == "month") {
      chartTitle = "Issues History - per month";
      var sum = 0;
      for (var i = 0; i < issueData.monthIssues.length; i++) {
        date[i] = issueData.monthIssues[i].date;
        frequency[i] = issueData.monthIssues[i].frequency;
        sum += issueData.monthIssues[i].frequency;
        total[i] = sum;
      }
    } else if (interval == "year") {
      chartTitle = "Issues History - per year";
      var sum = 0;
      for (var i = 0; i < issueData.yearIssues.length; i++) {
        date[i] = issueData.yearIssues[i].date;
        frequency[i] = issueData.yearIssues[i].frequency;
        sum += issueData.yearIssues[i].frequency;
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
        data: ["issues", "total"],
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
          issuet: 0,
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
          name: "issues",
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

export default IssueFreqChart;
