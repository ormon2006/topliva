import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  InputAdornment,
  useTheme,
} from "@mui/material";
import {
  LocalGasStation,
  AttachMoney,
  Calculate,
  CompareArrows,
} from "@mui/icons-material";
import { useState } from "react";

export const FuelCalculator = () => {
  const theme = useTheme();
  const [tankVolume, setTankVolume] = useState<number>(0);
  const [currentFuelLevel, setCurrentFuelLevel] = useState<number>(0);
  const [fuelPrice, setFuelPrice] = useState<number>(0);
  const [comparisonResults, setComparisonResults] = useState<{
    fullTankCost: number;
    neededLiters: number;
    refillCost: number;
    priceComparison: { name: string; price: number; savings: number }[];
  } | null>(null);

  const gasStations = [
    { name: "Лукойл", price: 52.3 },
    { name: "Роснефть", price: 51.8 },
    { name: "Газпром", price: 53.1 },
    { name: "Shell", price: 54.0 },
  ];

  const calculate = () => {
    const neededLiters = tankVolume * (1 - currentFuelLevel / 100);
    const fullTankCost = tankVolume * fuelPrice;
    const refillCost = neededLiters * fuelPrice;

    // Сравнение цен
    const priceComparison = gasStations
      .map((station) => ({
        ...station,
        savings: refillCost - neededLiters * station.price,
      }))
      .sort((a, b) => a.price - b.price);

    setComparisonResults({
      fullTankCost,
      neededLiters,
      refillCost,
      priceComparison,
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 3, borderRadius: 3, background: theme.palette.background.paper, maxWidth: "650px", mx: "auto", my: 4  }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
      >
        <Calculate color="dark  " /> 
      </Typography>

      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Объем бака (л)"
            type="number"
            fullWidth
            value={tankVolume}
                     sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: '#121212', 
                },
                "&:hover fieldset": {
                  borderColor: "#121212", 
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#121212", 
                },
              },
              "& label.Mui-focused": {
                color: "#121212", // цвет label при фокусе
              },
            }}
            onChange={(e) => setTankVolume(parseFloat(e.target.value))}
            InputProps={{
              endAdornment: <InputAdornment position="end">л</InputAdornment>,
              startAdornment: (
                <InputAdornment position="start">
                  <LocalGasStation color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Текущий уровень топлива (%)"
            type="number"
            fullWidth
            value={currentFuelLevel}
            onChange={(e) => setCurrentFuelLevel(parseFloat(e.target.value))}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
                                 sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: '#121212', 
                },
                "&:hover fieldset": {
                  borderColor: "#121212", 
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#121212", 
                },
              },
              "& label.Mui-focused": {
                color: "#121212", // цвет label при фокусе
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Цена топлива (₽/л)"
            type="number"
            fullWidth
            value={fuelPrice}
            onChange={(e) => setFuelPrice(parseFloat(e.target.value))}
                                 sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: '#121212', 
                },
                "&:hover fieldset": {
                  borderColor: "#121212", 
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#121212", 
                },
              },
              "& label.Mui-focused": {
                color: "#121212", // цвет label при фокусе
              },
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">₽/л</InputAdornment>,
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="dark"
            fullWidth
            onClick={calculate}
            startIcon={<Calculate />}
            sx={{ py: 1.5 }}
          >
            Рассчитать
          </Button>
        </Grid>
      </Grid>

      {comparisonResults && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            <CompareArrows
              color="info"
              sx={{ verticalAlign: "middle", mr: 1 }}
            />
            Результаты:
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  bgcolor: theme.palette.primary.light,
                }}
              >
                <Typography variant="body2">Стоимость полного бака</Typography>
                <Typography variant="h6">
                  {comparisonResults.fullTankCost.toFixed(2)} ₽
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  bgcolor: theme.palette.secondary.light,
                }}
              >
                <Typography variant="body2">Требуется долить</Typography>
                <Typography variant="h6">
                  {comparisonResults.neededLiters.toFixed(1)} л
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  bgcolor: theme.palette.success.light,
                }}
              >
                <Typography variant="body2">Стоимость дозаправки</Typography>
                <Typography variant="h6">
                  {comparisonResults.refillCost.toFixed(2)} ₽
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Сравнение цен на АЗС:
                </Typography>
                {comparisonResults.priceComparison.map((station, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      py: 1,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      color:
                        station.savings > 0
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                    }}
                  >
                    <Typography>{station.name}</Typography>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography>{station.price.toFixed(1)} ₽/л</Typography>
                      <Typography variant="caption">
                        {station.savings > 0
                          ? `Экономия: ${station.savings.toFixed(2)} ₽`
                          : `Переплата: ${Math.abs(station.savings).toFixed(
                              2
                            )} ₽`}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Paper>
  );
};
