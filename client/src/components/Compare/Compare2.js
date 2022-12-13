import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function Compare2(data1) {
  const chartRef = useRef(null);
const da=[63502,240805,28881,16966,3639];
var dat=[100,200,300,400,5000];

if(data1.total==2){
    dat=[10000,200,300,400,5000]
}
  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);
    var salvProName =["Microsoft","Google","facebook","Tsinghua University","Alibaba","Zhejiang University","Tencent","Peking University","ByteDance","NVIDIA"];
    var salvProValue =[213,164,139,121,108,106,102,95,94,79];
    var salvProMax =[];//背景按最大值
    for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[0])
    }
    const option = {
        backgroundColor: '#fff',
        title : {
          text: '项目对比概览',
          textStyle:{
              color:"#000"
          }
    
        },
        tooltip : {
            trigger: 'axis'
        },
        grid: {
            left: '2%',
            right: '2%',
            bottom: '3%',
            top:"10%",
            containLabel: true
        },
        legend: {
            data:['本项目', '对比项目'],
          textStyle:{
                    color:'#1bb4f6'
                },
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
             
              
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'value',
                boundaryGap : [0, 0.01],
              axisLabel: {
                  textStyle: {
                      fontSize: 18,
                      color: '#000'
                  }
              },
               axisLine: {
                lineStyle: {
                    color: '#000'
                }
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#000'
                }
            }
            }
        ],
        yAxis : [
            {
                type : 'category',
                name:"",
                data : ['Stars','Commits','issue','fork number','contributors'],
              axisLabel: {
                  textStyle: {
                      fontSize: 18,
                      color: '#000'
                  }
              },
               axisLine: {
                lineStyle: {
                    color: '#DDD'
                }
            },
            }
        ],
        series : [
            {
                name:'本项目',
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
                data: da,
            },
            {
                name:'对比项目',
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
                data:[2365,9003,23480,18000,30456]
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

export default Compare2;
