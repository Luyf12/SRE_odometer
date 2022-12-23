import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function ConList3() {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);
    var salvProName =["Microsoft","Google","Facebook","Tsinghua University","Alibaba","Tencent","ByteDance","NVIDIA"];
    var salvProValue =[213,164,139,121,108,102,94,79];
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
        series: [{
                name: '值',
                type: 'bar',
                zlevel: 1,
                itemStyle: {
                    normal: {
                        barBorderRadius: 30,
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: 'rgb(57,89,255,1)'
                        }, {
                            offset: 1,
                            color: 'rgb(46,200,207,1)'
                        }]),
                    },
                },
                barWidth: 20,
                data: salvProValue
            },
            {
                name: '背景',
                type: 'bar',
                barWidth: 20,
                barGap: '-100%',
                data: salvProMax,
                itemStyle: {
                    normal: {
                        color: 'rgba(24,31,68,0)',
                        barBorderRadius: 30,
                    }
                },
            },
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

export default ConList3;
