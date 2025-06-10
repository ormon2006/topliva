import {
  Box,
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
        maxWidth: 1200,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          mb: 4,
          fontWeight: 700,
          color: theme.palette.text.primary,
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
          '& .MuiTabs-indicator': {
            height: 3,
            backgroundColor: theme.palette.primary.main,
          },
          '& .MuiTab-root': {
            textTransform: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            minHeight: 48,
            color: theme.palette.text.secondary,
            '&.Mui-selected': {
              color: theme.palette.primary.main,
              fontWeight: 600,
            },
            '&:hover': {
              color: theme.palette.primary.main,
              opacity: 1,
            },
          },
        }}
      >
        <Tab
          label="Новая заправка"
          icon={<LocalGasStation fontSize="small" />}
          iconPosition="start"
        />
        <Tab
          label="Статистика"
          icon={<Equalizer fontSize="small" />}
          iconPosition="start"
        />
        <Tab
          label="Калькулятор"
          icon={<Calculate fontSize="small" />}
          iconPosition="start"
        />
        <Tab
          label="АЗС на карте"
          icon={<Map fontSize="small" />}
          iconPosition="start"
        />
      </Tabs>

      <Box sx={{ display: currentTab === 0 ? 'block' : 'none' }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: 'background.paper',
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

      <Box sx={{ display: currentTab === 1 ? 'block' : 'none', mt: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: 'background.paper',
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

      <Box sx={{ display: currentTab === 2 ? 'block' : 'none', mt: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: 'background.paper',
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

      <Box sx={{ display: currentTab === 3 ? 'block' : 'none', mt: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: 'background.paper',
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