// src/widgets/FuelStatsWidget/ui/FuelStatsWidget.tsx
import { Line } from "react-chartjs-2";
import { useFuelAnalysis } from "~features/fuel-analysis";
import { FuelRecord } from "~entities/FuelRecord";
import { calculateFuelConsumption } from "~entities/FuelRecord";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Paper,
  useTheme,
  Divider,
  Avatar,
  Stack,
  alpha,
} from "@mui/material";
import {
  LocalGasStation,
  AttachMoney,
  DirectionsCar,
  ShowChart,
} from "@mui/icons-material";

// Регистрация компонентов Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Иконки для карточек статистики
const statIcons = {
  consumption: <LocalGasStation fontSize="medium" />,
  cost: <AttachMoney fontSize="medium" />,
  perKm: <DirectionsCar fontSize="medium" />,
};

export const FuelStatsWidget = ({ records }: { records: FuelRecord[] }) => {
  const theme = useTheme();
  const { averageConsumption, totalSpent, costPerKm } =
    useFuelAnalysis(records);

  // Данные для графика
  const chartData = {
    labels: records.map((r) => r.date.toLocaleDateString()),
    datasets: [
      {
        label: "Цена за литр (₽)",
        data: records.map((r) => r.pricePerLiter),
        borderColor: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: theme.palette.primary.main,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Расход (л/100км)",
        data: records
          .map((r, i) => {
            if (i === 0) return null;
            return calculateFuelConsumption(
              r.odometer,
              records[i - 1].odometer,
              r.liters
            );
          })
          .filter(Boolean),
        borderColor: theme.palette.secondary.main,
        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: theme.palette.secondary.main,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Настройки графика
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: theme.palette.text.primary,
          font: {
            family: theme.typography.fontFamily,
            size: 14,
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        boxPadding: 4,
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.dataset.label.includes("₽")
                ? `${context.parsed.y.toFixed(2)} ₽`
                : `${context.parsed.y.toFixed(2)} л/100км`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily,
          },
        },
      },
      y: {
        grid: {
          color: alpha(theme.palette.divider, 0.5),
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily,
          },
          callback: (value: number | string) => {
            if (typeof value === "number") {
              return Number.isInteger(value) ? value : value.toFixed(1);
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <Box
      className="max-w-6xl mx-auto w-full"
      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
    >
      {records.length > 0 ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <StatCard
                title="Средний расход"
                value={`${averageConsumption.toFixed(2)}`}
                unit="л/100км"
                icon={statIcons.consumption}
                color="primary"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatCard
                title="Общие затраты"
                value={`${totalSpent.toFixed(2)}`}
                unit="₽"
                icon={statIcons.cost}
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatCard
                title="Стоимость 1 км"
                value={`${costPerKm.toFixed(2)}`}
                unit="₽"
                icon={statIcons.perKm}
                color="success"
              />
            </Grid>
          </Grid>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: 400,
              position: "relative",
              borderRadius: 4,
              background: theme.palette.background.paper,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 2, color: theme.palette.text.secondary }}
            >
              <ShowChart color="inherit" />
              <Typography variant="subtitle1" fontWeight="500">
                Динамика показателей
              </Typography>
            </Stack>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ height: "calc(100% - 70px)" }}>
              <Line data={chartData} options={options} />
            </Box>
          </Paper>
        </>
      ) : (
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 4,
            background: alpha(theme.palette.background.default, 0.5),
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Нет данных для отображения статистики.
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
            Добавьте первую заправку, чтобы увидеть аналитику
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

// Улучшенный компонент карточки статистики
const StatCard = ({
  title,
  value,
  unit,
  icon,
  color = "primary",
}: {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 3,
        background: theme.palette.background.paper,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 6px 16px ${alpha(theme.palette[color].main, 0.1)}`,
        },
      }}
    >
      <CardContent>
        <Stack className="grid items-center" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              bgcolor: alpha(theme.palette[color].main, 0.1),
              color: theme.palette[color].main,
              width: 38,
              height: 38,
            }}
          >
            {icon}
          </Avatar>
          <Box>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ letterSpacing: 0.5, fontSize: "12px" }}
            >
              {title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
              <Typography variant="h6" fontWeight="700" color={`${color}.main`}>
                {value}
              </Typography>
              <Typography variant="body2" color="text.disabled">
                {unit}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
