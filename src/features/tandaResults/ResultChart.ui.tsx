import { useEffect, useState, FC, useMemo, useCallback } from "react";
import ReactECharts from "echarts-for-react";
import { LinearProgress, Box, useMediaQuery, Theme } from "@mui/material";
import { motion } from "framer-motion";
import { cn } from "~app/lib/utils"; // Предполагается наличие утилит для классов
import { Reveal } from "~shared/lib/framer";
export interface ResultChartProps {
  results: {
    [key: string]: number;
  };
}

interface ChartData {
  name: string;
  value: number;
}

const CHART_COLORS = {
  primary: "#000",
  progress: "#000",
  background: "#000",
  text: "#000",
};

const SKILLS_MAP = [
  "Инициативность и самостоятельность",
  "Эмпатия и понимание пользователей",
  "Аналитическое мышление и работа с данными",
  "Креативность и визуальное мышление",
  "Планирование и организация",
  "Технические навыки и программирование",
];

export const ResultChart: FC<ResultChartProps> = ({ results }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("lg")
  );
  const [maxValue, setMaxValue] = useState(0);

  // Мемоизация данных
  const { data, isEmpty } = useMemo(() => {
    const rawData: ChartData[] = SKILLS_MAP.map((name) => ({
      name: name.replace(/ и /g, " и\n"),
      value: results[name] || 0,
    })).filter((item) => item.value > 0);

    const totalValue = rawData.reduce((acc, item) => acc + item.value, 0);

    const calculatedData = rawData
      .map((item) => ({
        ...item,
        value: totalValue ? Math.round((item.value / totalValue) * 100) : 0,
      }))
      .sort((a, b) => b.value - a.value);

    setMaxValue(Math.max(...calculatedData.map((item) => item.value), 0));

    return {
      data: calculatedData,
      isEmpty: calculatedData.every((item) => item.value === 0),
    };
  }, [results]);

  const chartOption = useMemo(
    () => ({
      tooltip: {
        trigger: "item" as const,
        formatter: (params: any) => `${params.name}: ${params.value}%`,
        backgroundColor: "#000",
        textStyle: { color: "#fff" },
      },
      radar: {
        indicator: data.map((item) => ({
          name: `${item.name} (${item.value}%)`,
          max: Math.ceil(maxValue * 1.2),
        })),
        radius: isMobile ? "60%" : "75%",
        shape: "polygon" as const,
        axisLine: { lineStyle: { color: "#000", width: 1 } },
        splitLine: { lineStyle: { color: "#000", width: 1 } },
        axisName: {
          color: "#000",
          fontSize: 14,
          fontFamily: "Roboto, sans-serif",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          borderRadius: 3,
          padding: [2, 2] as [number, number],
        },
      },
      series: [
        {
          type: "radar" as const,
          data: [
            {
              value: data.map((item) => item.value),
              name: "Ваши результаты",
              areaStyle: { color: CHART_COLORS.progress },
              lineStyle: { color: CHART_COLORS.progress, width: 2 },
              itemStyle: { color: CHART_COLORS.progress },
            },
          ],
        },
      ],
    }),
    [data, maxValue, isMobile]
  );

  const MobileSkillItem = useCallback(
    ({ skill, index }: { skill: ChartData; index: number }) => (
      <motion.div
        key={skill.name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={cn(
          "flex items-center gap-4 p-3 rounded-xl",
          "bg-[#E0E0E0] hover:bg-[#2A2A2A] transition-colors"
        )}
      >
        <Box
          className={cn(
            "bg-[black] text-white px-3.5 py-2",
            "rounded-full font-semibold min-w-[108px] text-center"
          )}
        >
          {skill.value}%
        </Box>

        <Box className="flex-1">
          <p className="text-[#2C2C2C] font-medium mb-1 text-base">
            {skill.name}
          </p>
          <LinearProgress
            variant="determinate"
            value={skill.value}
            sx={{
              height: 8,
              borderRadius: 4,
              background: "white",
              ".MuiLinearProgress-bar": {
                backgroundColor: CHART_COLORS.progress,
              },
            }}
          />
        </Box>
      </motion.div>
    ),
    []
  );

  if (isEmpty) {
    return (
      <div className="text-center p-8 text-gray-500">
        Недостаточно данных для отображения результатов
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 max-w-[1000px]">
      <div className="bg-[#F7F7F7] py-5 md:py-8 px-4 md:px-8 rounded-3xl shadow-lg">
        <Reveal from="left" delay={0.3}>
          <h2 className="text-[#2C2C2C] text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Ваши результаты:
          </h2>
        </Reveal>

        {isMobile ? (
          <div className="flex flex-col gap-3 mt-3">
            {data.map((skill, index) => (
              <MobileSkillItem key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        ) : (
          <Reveal from="bottom" delay={0.3}>
            <ReactECharts
              option={chartOption}
              style={{
                height: "500px",
                width: "100%",
                minHeight: "400px",
                margin: "0 auto",
              }}
              opts={{ renderer: "svg" }}
            />
          </Reveal>
        )}
      </div>
    </div>
  );
};
