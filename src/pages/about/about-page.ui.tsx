import {
  Box,
  Grid,
  Typography,
  Paper,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material";
import { FuelInputForm } from "~features/fuel-input";
import { FuelStatsWidget } from "~widgets/FuelStatsWidget";
import {
  getRecordsByVehicle,
  saveFuelRecord,
} from "~shared/api/fuelStorage.api";
import { useState } from "react";
import { FuelRecord } from "~entities/FuelRecord";
import { FuelCalculator } from "~features/FuelCalculator";
import { BishkekFuelMap } from "~features/BishkekFuelMap";
import {
  LocalGasStation,
  Equalizer,
  Calculate,
  Map,
} from "@mui/icons-material";

export const DashboardPage = () => {
  const theme = useTheme();
  const [vehicleId] = useState("default-vehicle");
  const [records, setRecords] = useState(getRecordsByVehicle(vehicleId));
  const [currentTab, setCurrentTab] = useState(0);

  const handleRecordAdded = (newRecord: FuelRecord) => {
    saveFuelRecord(newRecord);
    setRecords([...getRecordsByVehicle(vehicleId)]);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },

        mx: "auto",
        minHeight: "100vh",
        background:
          theme.palette.mode === "light"
            ? theme.palette.grey[50]
            : theme.palette.background.default,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          mb: 4,
          fontWeight: 700,
          color:
            theme.palette.mode === "light"
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
        }}
      >
        Учет расходов на топливо
      </Typography>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 4,
          "& .MuiTabs-indicator": {
            height: 4,
            borderRadius: "4px 4px 0 0",
          },
        }}
      >
        <Tab
          label="Новая заправка"
          icon={<LocalGasStation />}
          iconPosition="start"
          sx={{ minHeight: 60 }}
        />
        <Tab
          label="Статистика"
          icon={<Equalizer />}
          iconPosition="start"
          sx={{ minHeight: 60 }}
        />
        <Tab
          label="Калькулятор"
          icon={<Calculate />}
          iconPosition="start"
          sx={{ minHeight: 60 }}
        />
        <Tab
          label="АЗС на карте"
          icon={<Map />}
          iconPosition="start"
          sx={{ minHeight: 60 }}
        />
      </Tabs>

      <Box sx={{ display: currentTab === 0 ? "block" : "none" }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(145deg, #f5f5f5, #fff)"
                : "linear-gradient(145deg, #1e1e1e, #2d2d2d)",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              mb: 3,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LocalGasStation color="primary" />
            Новая заправка
          </Typography>
          <FuelInputForm
            vehicleId={vehicleId}
            onRecordAdded={handleRecordAdded}
          />
        </Paper>
      </Box>

      <Box sx={{ display: currentTab === 1 ? "block" : "none", mt: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(145deg, #f5f5f5, #fff)"
                : "linear-gradient(145deg, #1e1e1e, #2d2d2d)",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              mb: 3,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Equalizer color="primary" />
            Статистика заправок
          </Typography>
          <FuelStatsWidget records={records} />
        </Paper>
      </Box>

      <Box sx={{ display: currentTab === 2 ? "block" : "none", mt: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(145deg, #f5f5f5, #fff)"
                : "linear-gradient(145deg, #1e1e1e, #2d2d2d)",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              mb: 3,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Calculate color="primary" />
            Умный калькулятор
          </Typography>
          <FuelCalculator />
        </Paper>
      </Box>

      <Box sx={{ display: currentTab === 3 ? "block" : "none", mt: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(145deg, #f5f5f5, #fff)"
                : "linear-gradient(145deg, #1e1e1e, #2d2d2d)",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              mb: 3,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Map color="primary" />
            Ближайшие АЗС
          </Typography>
          <BishkekFuelMap />
        </Paper>
      </Box>
    </Box>
  );
};
