import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function CompanyListStar(data) {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);

    var salvProName = new Array();
    var salvProValue = new Array();
    if (data.data.data != null) {
      var dataLength = 10;
      if (data.data.data.stargazers.length < 10)
        dataLength = data.data.data.stargazers.length;
      for (var i = 0; i < dataLength; i++) {
        salvProName[i] = data.data.data.stargazers[i].company;
        salvProValue[i] = data.data.data.stargazers[i].num;
      }
    }

    var salvProMax = []; //背景按最大值
    for (let i = 0; i < salvProValue.length; i++) {
      salvProMax.push(salvProValue[0]);
    }
    const option = {
      backgroundColor: "#fff",
      grid: {
        left: "2%",
        right: "2%",
        bottom: "2%",
        top: "2%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
        },
        formatter: function (params) {
          return params[0].name + " : " + params[0].value;
        },
      },
      xAxis: {
        show: false,
        type: "value",
      },
      yAxis: [
        {
          type: "category",
          inverse: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#000",
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          data: salvProName,
        },
        {
          type: "category",
          inverse: true,
          axisTick: "none",
          axisLine: "none",
          show: true,
          axisLabel: {
            textStyle: {
              color: "#000",
              fontSize: "12",
            },
          },
          data: salvProValue,
        },
      ],
      series: [
        {
          name: "值",
          type: "bar",
          zlevel: 1,
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#00acee",
                },
                {
                  offset: 1,
                  color: "#a7e7ff",
                },
              ]),
            },
          },
          barWidth: 20,
          data: salvProValue,
        },
        {
          name: "背景",
          type: "bar",
          barWidth: 20,
          barGap: "-100%",
          data: salvProMax,
          itemStyle: {
            normal: {
              color: "rgba(24,31,68,0)",
              barBorderRadius: 30,
            },
          },
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

export default CompanyListStar;
