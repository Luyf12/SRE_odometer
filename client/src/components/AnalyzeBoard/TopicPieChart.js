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

const TopicPieChart = () => {
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
    var topic = [
      { value: 3829, name: "test" },
      { value: 3245, name: "document" },
      { value: 1381, name: "perform" },
      { value: 584, name: "code" },
      { value: 360, name: "config" },
      { value: 249, name: "clarif" },
      { value: 95, name: "maintain" },
      { value: 44, name: "rubust" },
    ];
    var option = {
      title: {
        text: "Design Topics",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
            normal: {
              color: function (params) {
                return colorList[params.dataIndex];
              },
            },
          },
          label: {
            show: true,
            position: "inside",
            fontSize: 14,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: topic,
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

export default TopicPieChart;
