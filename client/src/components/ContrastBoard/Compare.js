import { useEffect, useRef } from "react";
import * as echarts from "echarts";
function Compare(total) {
  const chartRef = useRef(null);
const da=[63502,240805,28881,16966,3639];


  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);
    
    const option = {
        title: {
            text: '基础雷达图'
        },
        tooltip: {},
        legend: {
            data: ['本项目', '对比项目']
        },
        radar: {
            // shape: 'circle',
            indicator: [
              { name: 'Commits', max: 30000},
              { name: 'Issues', max: 16000},
              { name: 'Forks', max: 30000},
              { name: 'Stars', max: 78000},
              { name: 'PR creators', max: 5000}
            ]
        },
        series: [{
            name: '项目对比雷达图',
            type: 'radar',
            // areaStyle: {normal: {}},
            data : [
                {
                    value : total.total,
                    name : '本项目'
                },
                 {
                    value : [12000, 16000, 30000, 56000, 3200],
                    name : '对比项目'
                }
            ]
        }]
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
