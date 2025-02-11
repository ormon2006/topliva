import { useEffect, useState, FC } from "react";
import ReactECharts from "echarts-for-react";
import { Typography } from "@mui/material";

export interface ResultChartProps {
  results: {
    [key: string]: number;
  };
}

interface ChartData {
  name: string;
  value: number;
}

export const ResultChart: FC<ResultChartProps> = ({ results }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    let resizeTimeout: number;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const rawData: ChartData[] = [
    {
      name: "Инициативность и\nсамостоятельность",
      value: results["Инициативность и самостоятельность"] || 0,
    },
    {
      name: "Эмпатия и  понимание\n пользователей",
      value: results["Эмпатия и понимание пользователей"] || 0,
    },
    {
      name: "Аналитическое мышление \nи работа с данными",
      value: results["Аналитическое мышление и работа с данными"] || 0,
    },
    {
      name: "Креативность и \nвизуальное мышление",
      value: results["Креативность и визуальное мышление"] || 0,
    },
    {
      name: "Планирование \n и организация",
      value: results["Планирование и организация"] || 0,
    },
    {
      name: "Технические навыки \n и программирование",
      value: results["Технические навыки и программирование"] || 0,
    },
  ].filter((item): item is ChartData => item.value > 0);

  const totalValue = rawData.reduce((acc, item) => acc + item.value, 0);

  const data = rawData
    .map((item) => ({
      name: item.name,
      value: totalValue ? Math.round((item.value / totalValue) * 100) : 0,
    }))
    .sort((a, b) => b.value - a.value);

  if (data.every((item) => item.value === 0)) {
    return <div>Нет данных для отображения результатов</div>;
  }

  const option = {
    tooltip: {
      trigger: "item" as const,
      formatter: (params: any) => `${params.name}: ${params.value}%`,
      backgroundColor: "rgba(50, 50, 50, 0.8)",
      textStyle: { color: "#fff" },
    },
    radar: {
      indicator: data.map((item) => ({
        name: `${item.name} (${item.value}%)`,
        max: 45,
      })),
      radius: isMobile ? "60%" : "75%",
      splitNumber: 1,
      shape: "polygon" as const,
      splitArea: {
        areaStyle: {
          color: ["#fff"],
        },
      },
      axisLine: {
        lineStyle: {
          color: "#4e73a1",
          width: 1,
        },
      },
      splitLine: {
        lineStyle: {
          color: "#4e73a1",
          width: 1,
        },
      },
      axisName: {
        color: "#333",
        fontSize: 18,
        fontFamily: "Roboto, sans-serif",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: 3,
        padding: [2, 2] as [number, number],
        fontWeight: 400 as const,
      },
    },
    series: [
      {
        name: "Результаты",
        type: "radar" as const,
        data: [
          {
            value: data.map((item) => item.value),
            name: "Ваши результаты",
            areaStyle: {
              color: "#00cc44",
            },
            lineStyle: {
              color: "#00cc44",
              width: 2,
            },
            itemStyle: {
              color: "#00cc44",
              borderWidth: 0,
            },
          },
        ],
      },
    ],
  };

  return (
    <div>
      <div className="w-[1000px] box-border m-auto ">
        <div className="bg-white py-[20px] px-[40px] rounded-[20px]">
          <Typography variant="h2" className="text-[32px] font-bold">
            Ваши результаты:
          </Typography>
          <div className=" ">
            <ReactECharts
              className="max-md:w-[400px] max-md:h-[450px] max-md:relative max-md:bottom-[100px] max-sm:w-[300px]"
              option={option}
              style={{
                height: isMobile ? "300px" : "500px",
                textAlign: "center",
                maxWidth: "900px",
                marginTop: "20px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
