import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function Companyconstar() {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);
    var plantCap = [
      { name: "Microsoft", value: 213 },
      { name: "Google", value: 164 },

      { name: "facebook", value: 139 },

      { name: "Tsinghua University", value: 121 },
      { name: "Alibaba", value: 108 },
      { name: "Tencent", value: 102 },
      { name: "ByteDance", value: 94 },
      { name: "NVIDIA", value: 79 },
    ];
    var plantCap1 = [
      { name: "facebook", value: 170 },
      { name: "Microsoft", value: 50 },
      { name: "NVIDIA", value: 42 },
      { name: "Meta", value: 33 },

      { name: "Google", value: 27 },
      { name: "Intel", value: 24 },
      { name: "facebookresearch", value: 12 },
      { name: "pytorch", value: 10 },
    ];
    var datalist1 = [
      {
        offset: [76, 68],
        symbolSize: 154,
        opacity: 0.95,
        color: "rgba(104,184,55, 1)",
      },
      {
        offset: [5, 43],
        symbolSize: 115,
        opacity: 0.84,
        color: "rgba(104,184,55, 0.95)",
      },
      {
        offset: [83, 35],
        symbolSize: 113,
        opacity: 0.8,
        color: "rgba(104,184,55, 0.95)",
      },
      {
        offset: [36, 10],
        symbolSize: 95,
        opacity: 0.75,
        color: "rgba(104,184,55, 0.90)",
      },
      {
        offset: [64, 20],
        symbolSize: 92,
        opacity: 0.7,
        color: "rgba(104,184,55, 0.90)",
      },
      {
        offset: [30, 75],
        symbolSize: 87,
        opacity: 0.68,
        color: "rgba(104,184,55, 0.85)",
      },
      {
        offset: [90, 72],
        symbolSize: 60,
        opacity: 0.7,
        color: "rgba(104,184,55, 0.80)",
      },
      {
        offset: [40, 85],
        symbolSize: 60,
        opacity: 0.88,
        color: "rgba(104,184,55, 0.95)",
      },
    ];

    var datalist = [
      {
        offset: [56, 48],
        symbolSize: 154,
        opacity: 0.95,
        color: "#248ff7",
      },
      {
        offset: [20, 43],
        symbolSize: 115,
        opacity: 0.84,
        color: "#248ff7",
      },
      {
        offset: [93, 15],
        symbolSize: 113,
        opacity: 0.8,
        color: "#248ff7",
      },
      {
        offset: [36, 30],
        symbolSize: 95,
        opacity: 0.75,
        color: "#248ff7",
      },
      {
        offset: [54, 20],
        symbolSize: 92,
        opacity: 0.7,
        color: "#248ff7",
      },
      {
        offset: [35, 45],
        symbolSize: 87,
        opacity: 0.68,
        color: "#248ff7",
      },
      {
        offset: [90, 52],
        symbolSize: 60,
        opacity: 0.7,
        color: "#248ff7",
      },
      {
        offset: [40, 65],
        symbolSize: 60,
        opacity: 0.88,
        color: "#248ff7",
      },
    ];
    var datas = [];
    for (var i = 0; i < plantCap1.length; i++) {
      var item = plantCap1[i];
      var itemToStyle = datalist[i];
      datas.push({
        name: item.value + "\n" + item.name,
        value: itemToStyle.offset,
        symbolSize: itemToStyle.symbolSize,
        label: {
          normal: {
            textStyle: {
              fontSize: 14,
              color: "#fff",
            },
          },
        },
        itemStyle: {
          normal: {
            color: itemToStyle.color,
            opacity: itemToStyle.opacity,
          },
        },
      });
    }
    var datas1 = [];
    for (var i = 0; i < plantCap.length; i++) {
      var item = plantCap[i];
      var itemToStyle = datalist1[i];
      datas1.push({
        name: item.value + "\n" + item.name,
        value: itemToStyle.offset,
        symbolSize: itemToStyle.symbolSize,
        label: {
          normal: {
            textStyle: {
              fontSize: 14,
              color: "#fff",
            },
          },
        },
        itemStyle: {
          normal: {
            color: itemToStyle.color,
            opacity: itemToStyle.opacity,
          },
        },
      });
    }
    const option = {
      grid: {
        show: false,
        top: 10,
        bottom: 10,
      },
      legend: {
        data: ["本项目", "对比项目"],
        textStyle: {
          color: "#248ff7",
        },
      },
      xAxis: [
        {
          gridIndex: 0,
          type: "value",
          show: false,
          min: 0,
          max: 100,
          nameLocation: "middle",
          nameGap: 5,
        },
      ],
      yAxis: [
        {
          gridIndex: 0,
          min: 0,
          show: false,
          max: 100,
          nameLocation: "middle",
          nameGap: 30,
        },
      ],
      series: [
        {
          name: "本项目",
          type: "scatter",
          symbol: "circle",
          symbolSize: 120,
          label: {
            normal: {
              show: true,
              formatter: "{b}",
              color: "#248ff7",
              textStyle: {
                fontSize: "20",
              },
            },
          },
          itemStyle: {
            normal: {
              borderWidth: "4",
              borderType: "solid",
              borderColor: "#fff",
              color: "#248ff7",
              shadowColor: "#248ff7",
              shadowBlur: 10,
            },
          },
          data: datas,
        },
        {
          name: "对比项目",
          type: "scatter",
          symbol: "circle",
          symbolSize: 120,
          label: {
            normal: {
              show: true,
              formatter: "{b}",
              color: "#fff",
              textStyle: {
                fontSize: "20",
              },
            },
          },
          itemStyle: {
            normal: {
              borderWidth: "4",
              borderType: "solid",
              borderColor: "#fff",
              color: "#68b837",
              shadowColor: "#68b837",
              shadowBlur: 10,
            },
          },
          data: datas1,
        },
      ],
    };

    chartInstance.setOption(option);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div ref={chartRef} style={{ height: "400px" }}></div>
    </div>
  );
}

export default Companyconstar;
