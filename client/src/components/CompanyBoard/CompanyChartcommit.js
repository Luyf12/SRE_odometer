import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function BubbleCommit(data) {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);

    var plantCap = [];
    if (data.data.data != null) {
      console.log(data.data.data.committers);
      var dataLength = 10;
      if (data.data.data.committers.length < 10)
        dataLength = data.data.data.committers.length;
      for (var i = 0; i < dataLength; i++) {
        plantCap[i] = {
          name: data.data.data.committers[i].company,
          value: data.data.data.committers[i].num,
          id: i,
        };
      }
    }

    var datalist = [
      { offset: 80, color: "#00acee" },
      { offset: 30, color: "#00acee" },
      { offset: 60, color: "#00acee" },
      { offset: 85, color: "#52cdd5" },
      { offset: 30, color: "#52cdd5" },
      { offset: 60, color: "#52cdd5" },
      { offset: 20, color: "#79d9f1" },
      { offset: 80, color: "#a7e7ff" },
      { offset: 40, color: "#79d9f1" },
      { offset: 70, color: "#a7e7ff" },
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
      var symbolsize = (item.value / sum) * maxVal * 3;
      if (item.value <= 50) symbolsize = symbolsize * 2.5;
      if (item.value > 100) symbolsize = symbolsize - 40;
      if (item.value <= 12) symbolsize = symbolsize * 2;
      symbolsize = symbolsize + 20;
      if (item.value <= 20) symbolsize = symbolsize + 60;

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
              color: "#000",
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
      <div ref={chartRef} style={{ height: "500px" }}></div>
    </div>
  );
}

export default BubbleCommit;
