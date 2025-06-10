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
import { Box, Typography, Grid, Paper, useTheme, alpha } from "@mui/material";
import {
  LocalGasStation,
  AttachMoney,
  DirectionsCar,
  ShowChart,
} from "@mui/icons-material";

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

export const FuelStatsWidget = ({ records }: { records: FuelRecord[] }) => {
  const theme = useTheme();
  const { averageConsumption, totalSpent, costPerKm } =
    useFuelAnalysis(records);

  const chartData = {
    labels: records.map((r) => r.date.toLocaleDateString()),
    datasets: [
      {
        label: "Цена за литр (сом)",
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
          },
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
        },
      },
      y: {
        grid: {
          color: alpha(theme.palette.divider, 0.5),
        },
        ticks: {
          color: theme.palette.text.secondary,
        },
      },
    },
  };

  if (records.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography>Нет данных для отображения</Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: "800px", mx: "auto", my: 4  }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Средний расход"
            value={averageConsumption.toFixed(2)}
            unit="л/100км"
            icon={<LocalGasStation />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Общие затраты"
            value={totalSpent.toFixed(0)}
            unit="сом"
            icon={<AttachMoney />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Стоимость 1 км"
            value={costPerKm.toFixed(0)}
            unit="сом"
            icon={<DirectionsCar />}
          />
        </Grid>
      </Grid>

      <Paper sx={{ p: 2, height: 400 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <ShowChart />
          <Typography variant="subtitle1">Динамика показателей</Typography>
        </Box>
        <Box sx={{ height: 350 }}>
          <Line data={chartData} options={options} />
        </Box>
      </Paper>
    </Box>
  );
};

const StatCard = ({
  title,
  value,
  unit,
  icon,
}: {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
}) => {
  return (
    <Paper sx={{ p: 2, height: "100%" }}>
      <Box display="flex" alignItems="center" gap={2}>
        {icon}
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h6">
            {value}{" "}
            <Typography component="span" variant="body2">
              {unit}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
