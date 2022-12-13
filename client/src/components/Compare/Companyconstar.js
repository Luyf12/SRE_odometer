import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function Companyconstar1() {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);
    var salvProName =["Microsoft","Google","facebook","Tsinghua University","Alibaba","Zhejiang University","Tencent","Peking University","ByteDance","NVIDIA"];
    var salvProValue =[213,164,139,121,108,106,102,95,94,79];
    var salvProMax =[];//背景按最大值
    for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[0])
    }
    const option = {
        backgroundColor:"#fff",
        grid: {
            left: '2%',
            right: '2%',
            bottom: '2%',
            top: '2%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'none'
            },
            formatter: function(params) {
                return params[0].name  + ' : ' + params[0].value
            }
        },
        legend: {
            data:['本项目', '对比项目'],
          textStyle:{
                    color:'#1bb4f6'
                },
        },
        xAxis: {
            show: false,
            type: 'value'
        },
        yAxis: [{
            type: 'category',
            inverse: true,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#000'
                },
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            data: salvProName
        }, {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
                textStyle: {
                    color: '#000',
                    fontSize: '12'
                },
            },
            data:salvProValue
        }],
        series : [
            {
                name:'本项目',
                type:'bar',
                 itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#8bd46e'
                    }, {
                        offset: 1,
                        color: '#09bcb7'
                    }]),
                    barBorderRadius: 10,
                    
                }
                
              },
                data:salvProValue,
            },
            {
                name:'对比项目',
                type:'bar',
                itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#248ff7'
                    }, {
                        offset: 1,
                        color: '#6851f1'
                    }]),
                barBorderRadius: 10,
                }
              },
                data:[200,300, 650, 880, 300]
            }
        ]
    };
    chartInstance.setOption(option);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div ref={chartRef} style={{ height: "400px" }}></div>
    </div>
  );
}

export default Companyconstar1;