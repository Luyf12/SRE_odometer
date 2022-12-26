import { useEffect, useRef } from "react";
import * as echarts from "echarts";
function Compare(total) {
  const chartRef = useRef(null);
  const da = [63502, 240805, 28881, 16966, 3639];

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);

    const option = {
      title: {
        text: "基础雷达图",
      },
      tooltip: {},
      legend: {
        data: ["本项目", "对比项目"],
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: "Commits", max: 250000 },
          { name: "Issues", max: 16000 },
          { name: "Forks", max: 35000 },
          { name: "Stars", max: 220000 },
          { name: "PR creators", max: 5000 },
        ],
      },
      series: [
        {
          name: "项目对比雷达图",
          type: "radar",
          // areaStyle: {normal: {}},
          data: [
            {
              value: total.total,
              name: "本项目",
            },
            {
              value: [5549, 10070, 33167, 217962, 1154],
              name: "对比项目",
            },
          ],
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

export default Compare;
