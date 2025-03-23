import { useEffect, useState, FC } from "react";
import ReactECharts from "echarts-for-react";
import { Typography, LinearProgress, Box } from "@mui/material";
import { motion } from "framer-motion";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    let resizeTimeout: number;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        setIsMobile(window.innerWidth < 1024);
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

  const MobileList = () => (
    <Box
      sx={{
        width: "100%",
        mt: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {data.map((skill, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            padding: "12px 16px",
            borderRadius: "12px",
            backgroundColor: "#1E1E1E",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              bgcolor: "#005B50",
              color: "rgb(255, 255, 255)",
              padding: "8px 14px",
              borderRadius: "32px",
              fontWeight: 600,
              fontSize: "16px",
              minWidth:'108px',

            }}
          >
            {skill.value}%
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body1"
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                mb: "4px",
                color: "#E0E0E0",
              }}
            >
              {skill.name}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={skill.value}
              sx={{
                height: "8px",
                borderRadius: "4px",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#00cc44",
                },
              }}
            />
          </Box>
        </motion.div>
      ))}
    </Box>
  );
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
    <div className="  mx-auto px-4">
      <div className=" mx-auto max-w-[1000px] bg-white py-5 md:py-8 px-4 md:px-8 rounded-3xl shadow-sm">
        <Typography
          variant="h2"
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          Ваши результаты:
        </Typography>

        {isMobile ? (
          <MobileList />
        ) : (
          <ReactECharts
            option={option}
            style={{
              height: "500px",
              width: "100%",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          />
        )}
      </div>
    </div>
  );
};
