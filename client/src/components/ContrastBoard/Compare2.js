import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function Compare2(total) {
  const chartRef = useRef(null);
  console.log(total);
  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);

    const option = {
      title: {
        text: "概况对比图",
      },
      tooltip: {},
      legend: {
        data: ["本项目", "对比项目"],
      },
      radar: {
        indicator: [
          { name: "Commits", max: 250000 },
          { name: "Issues", max: 16000 },
          { name: "Forks", max: 30000 },
          { name: "Stars", max: 110000 },
          { name: "PR creators", max: 5000 },
        ],
      },
      series: [
        {
          name: "概况对比图",
          type: "radar",

          data: [
            {
              value: total.total,
              name: "本项目",
            },
            {
              value: [97675, 15898, 24944, 100682, 3915],
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

export default Compare2;
