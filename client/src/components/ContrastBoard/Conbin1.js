import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function Conbin1() {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      series: [
        {
          name: "language占比",
          type: "pie",
          radius: "68%",
          center: ["50%", "50%"],
          clockwise: false,
          data: [
            {
              value: 95,
              name: "TypeScript",
            },
            {
              value: 4,
              name: "JavaScript",
            },
            {
              value: 1,
              name: "Other",
            },
          ],
          label: {
            normal: {
              textStyle: {
                color: "#999",
                fontSize: 8,
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              borderWidth: 4,
              borderColor: "#ffffff",
            },
            emphasis: {
              borderWidth: 0,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
      color: ["#00acee", "#52cdd5", "#79d9f1", "#a7e7ff", "#c8efff"],
      backgroundColor: "#fff",
    };
    chartInstance.setOption(option);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div ref={chartRef} style={{ height: "400px" }}></div>
    </div>
  );
}

export default Conbin1;
