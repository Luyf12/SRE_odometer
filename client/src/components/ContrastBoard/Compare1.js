import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function Compare1(total) {
  const chartRef = useRef(null);
  const da = [63502, 240805, 28881, 16966, 3639];

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);
    var salvProName = [
      "Microsoft",
      "Google",
      "facebook",
      "Tsinghua University",
      "Alibaba",
      "Zhejiang University",
      "Tencent",
      "Peking University",
      "ByteDance",
      "NVIDIA",
    ];
    var salvProValue = [213, 164, 139, 121, 108, 106, 102, 95, 94, 79];
    var salvProMax = []; //背景按最大值
    for (let i = 0; i < salvProValue.length; i++) {
      salvProMax.push(salvProValue[0]);
    }
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
          { name: "Forks", max: 30000 },
          { name: "Stars", max: 78000 },
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
              value: [17986, 6, 28363, 73502, 4223],
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

export default Compare1;
