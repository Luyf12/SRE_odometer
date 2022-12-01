import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function LineBarChart1() {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);
    var plantCap = [
      { name: "NVIDIA", value: 79, id: "001" },
      { name: "ByteDance", value: 94, id: "002" },
      { name: "Alibaba", value: 108, id: "003" },
      { name: "facebook", value: 139, id: "004" },
      { name: "Google", value: 164, id: "005" },
      { name: "Microsoft", value: 213, id: "006" },
      { name: "Tsinghua University", value: 121, id: "007" },
      { name: "Tencent", value: 102, id: "008" },
      { name: "Zhejiang University", value: 106, id: "009" },
      { name: "Peking University", value: 95, id: "010" },
    ];

    var datalist = [
      { offset: 80, color: "#f467ce" },
      { offset: 30, color: "#7aabe2" },
      { offset: 60, color: "#ff7123" },
      { offset: 90, color: "#ffc400" },
      { offset: 10, color: "#5e333f" },
      { offset: 60, color: "#6b3442" },
      { offset: 20, color: "#8a3647" },
      { offset: 80, color: "#68333f" },
      { offset: 40, color: "#68333f" },
      { offset: 70, color: "#68333f" },
    ];

    var minSymbolSize = 20,
      maxSymbolSize = 130,
      sum = 0,
      val = [];
    for (var i = 0; i < plantCap.length; i++) {
      sum += plantCap[i].value;
      val.push(plantCap[i].value);
    }
    var datas = [],
      len = 100 / plantCap.length,
      leftLen = len / 2,
      maxVal = Math.max.apply(this, val);
    for (var i = 0; i < plantCap.length; i++) {
      var item = plantCap[i];
      var itemToStyle = datalist[i];
      var symbolsize = (item.value / sum) * maxVal * 6;

      var offset = [leftLen, itemToStyle.offset, item.id];
      leftLen += len;
      datas.push({
        name: item.value + "\n" + item.name,
        value: offset,
        symbolSize: symbolsize,
        itemStyle: {
          normal: {
            color: itemToStyle.color,
          },
        },
      });
    }
    const option = {
      grid: {
        show: false,
        left: 50,
        right: 50,
        top: 0,
        bottom: 0,
      },
      xAxis: [
        {
          gridIndex: 0,
          type: "value",
          show: false,
          min: 0,
          max: 100,
        },
      ],
      yAxis: [
        {
          gridIndex: 0,
          min: 0,
          show: false,
          max: 100,
        },
      ],
      series: [
        {
          type: "scatter",
          label: {
            normal: {
              show: true,
              formatter: "{b}",
              color: "#fff",
              textStyle: {
                fontSize: 12,
              },
            },
          },
          data: datas,
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

export default LineBarChart1;
