import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function LineBarChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);
    var plantCap = [{
      name: 'Facebook',
      value: '88'
  }, {
      name: 'Quansight',
      value: '30'
  },
  {
    name: 'NVIDIA',
    value: '26'
},
{
  name: 'Pytorch',
  value: '25'
},
  {
      name: 'Intel',
      value: '17'
  }, {
      name: '1234',
      value: '95'
  }, {
      name: '十九大',
      value: '92'
  }, {
      name: '党建',
      value: '87'
  }, {
      name: '贯彻落实',
      value: '87'
  }, {
      name: '党廉',
      value: '60'
  }];
  
  var datalist = [{
      offset: [56, 48],
      symbolSize: 150,
      opacity: .95,
      color: '#f467ce'
  }, {
      offset: [35, 80],
      symbolSize: 90,
      opacity: .88,
      color: '#7aabe2'
  }, {
      offset: [20, 43],
      symbolSize: 84,
      opacity: .84,
      color: '#ff7123'
  }, {
      offset: [83, 30],
      symbolSize: 75,
      opacity: .8,
      color: '#ffc400'
  }, {
      offset: [36, 20],
      symbolSize: 56,
      opacity: .75,
      color: '#5e333f'
  }, {
      offset: [64, 10],
      symbolSize:56,
      opacity: .7,
      color: '#6b3442'
  }, {
      offset: [75, 75],
      symbolSize: 50,
      opacity: .68,
      color: '#8a3647'
  }, 
  {
    offset: [10, 10],
    symbolSize: 48,
    opacity: .68,
    color: '#8a3647'
},
{
  offset: [10, 75],
  symbolSize: 45,
  opacity: .68,
  color: '#8a3647'
},
  {
      offset: [88, 62],
      symbolSize: 42,
      opacity: .6,
      color: '#68333f'
  }];
  var datas = [];
  for (var i = 0; i < plantCap.length; i++) {
      var item = plantCap[i];
      var itemToStyle = datalist[i];
      datas.push({
          name: item.value + '\n' + item.name,
          value: itemToStyle.offset,
          symbolSize: itemToStyle.symbolSize,
          label: {
              normal: {
                  textStyle: {
                      fontSize: 11
                  }
              }
          },
          itemStyle: {
              normal: {
                  color: itemToStyle.color,
                  opacity: itemToStyle.opacity
              }
          },
      })
  }
   const option = {
    grid: {
      show: false,
      top: 10,
      bottom: 10
  },
  xAxis: [{
      gridIndex: 0,
      type: 'value',
      show: false,
      min: 0,
      max: 100,
      nameLocation: 'middle',
      nameGap: 5
  }],
  yAxis: [{
      gridIndex: 0,
      min: 0,
      show: false,
      max: 100,
      nameLocation: 'middle',
      nameGap: 30
  }],
  series: [{
      type: 'scatter',
      symbol: 'circle',
      symbolSize: 120,
      label: {
          normal: {
              show: true,
              formatter: '{b}',
              color: '#fff',
              textStyle: {
                  fontSize: '20'
              }
          },
      },
      itemStyle: {
          normal: {
              color: '#00acea'
          }
      },
      data: datas
  }]
      };
    chartInstance.setOption(option);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>图</h2>
      <div ref={chartRef} style={{ height: "400px" }}></div>
    </div>
  );
}

export default LineBarChart;