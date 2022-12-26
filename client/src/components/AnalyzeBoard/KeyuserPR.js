import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function KeyuserPR(coredata) {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);

    var data = [];
    if (coredata.data != null) {
      for (var i = 0; i < coredata.data.length; i++) {
        data.push({
          value: coredata.data[i].lines,
          name: coredata.data[i].name + " lines: " + coredata.data[i].lines,
        });
      }
    }

    const option = {
      visualMap: {
        show: true,
        min: 0,
        max: 1200000,
        itemWidth: 20,
        itemHeight: 130,
        itemGap: 20,
        right: "15%",
        top: 10,
        align: "left",
        orient: "horizontal",
        text: ["1200000", "0"],
        textStyle: {
          color: "#333",
          fontSize: 14,
          align: "right",
        },
        inRange: {
          color: ["#DFF6FF", "#1363DF"],
        },
      },
      title: {
        text: "核心用户",
        subtext: "",
        left: "50%",
        top: "10",
        textAlign: "center",
        textStyle: {
          color: "#000",
          fontWeight: "normal",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}",
      },
      series: [
        {
          type: "treemap",
          width: "100%",
          height: "90%",
          top: "10%",
          roam: false, //是否开启拖拽漫游（移动和缩放）
          nodeClick: false, //点击节点后的行为,false无反应
          breadcrumb: {
            show: false,
          },
          label: {
            //描述了每个矩形中，文本标签的样式。
            normal: {
              show: true,
              position: ["10%", "40%"],
            },
          },
          itemStyle: {
            normal: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: 16,
              },
              borderWidth: 1,
              borderColor: "#fff",
            },

            emphasis: {
              label: {
                show: true,
              },
            },
          },
          data: data,
        },
      ],
    };

    chartInstance.setOption(option);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div ref={chartRef} style={{ height: "600px" }}></div>
    </div>
  );
}

export default KeyuserPR;
