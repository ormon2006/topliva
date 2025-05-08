import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Alert,
  Snackbar,
  Paper,
  Tooltip,
  Fade,
  Zoom,
  Avatar,
  useTheme,
  Stack,
  alpha,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { useFuelForm } from "./model/useFuelForm";
import { useState, useEffect } from "react";
import {
  LocalGasStation,
  AttachMoney,
  DirectionsCar,
  Save,
  Refresh,
  Event,
  Delete,
  History,
} from "@mui/icons-material";
import { FuelRecord } from "~entities/FuelRecord";

export const FuelInputForm = ({
  vehicleId,
  onRecordAdded,
}: {
  vehicleId: string;
  onRecordAdded: (record: any) => void;
}) => {
  const theme = useTheme();
  const { record, updateField, resetForm } = useFuelForm(vehicleId);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    date: false,
    liters: false,
    pricePerLiter: false,
    odometer: false,
  });
  const [history, setHistory] = useState<FuelRecord[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem(`fuelHistory_${vehicleId}`);
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        const historyWithDates = parsedHistory.map((item: any) => ({
          ...item,
          date: new Date(item.date),
        }));
        setHistory(historyWithDates);
      } catch (e) {
        console.error("Ошибка загрузки истории заправок:", e);
      }
    }
  }, [vehicleId]);

  const saveToHistory = (newRecord: FuelRecord) => {
    const updatedHistory = [...history, newRecord];
    setHistory(updatedHistory);
    localStorage.setItem(
      `fuelHistory_${vehicleId}`,
      JSON.stringify(
        updatedHistory.map((record) => ({
          ...record,
          date: record.date.toISOString(),
        }))
      )
    );
  };

  const deleteFromHistory = (id: string) => {
    const updatedHistory = history.filter((record) => record.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem(
      `fuelHistory_${vehicleId}`,
      JSON.stringify(
        updatedHistory.map((record) => ({
          ...record,
          date: record.date.toISOString(),
        }))
      )
    );
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Проверка валидности данных
    const errors = {
      date: !record.date,
      liters: record.liters <= 0,
      pricePerLiter: record.pricePerLiter <= 0,
      odometer: record.odometer <= 0,
    };

    setFieldErrors(errors);

    if (!Object.values(errors).some(Boolean)) {
      const newRecord = {
        ...record,
        id: Date.now().toString(),
        totalCost: record.liters * record.pricePerLiter,
      };
      onRecordAdded(newRecord);
      saveToHistory(newRecord);
      if (resetForm) {
        resetForm();
      }
      setOpenSnackbar(true);
    }
  };

  const handleReset = () => {
    if (resetForm) {
      resetForm();
    }
  };
  const totalSpent = history.reduce((sum, record) => sum + record.totalCost, 0);
  const totalLiters = history.reduce((sum, record) => sum + record.liters, 0);
  const avgPrice = totalLiters > 0 ? totalSpent / totalLiters : 0;
  return (
    <Box className='max-w-6xl mx-auto'>
      <Zoom in={true} style={{ transitionDelay: "100ms" }}>
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 4,
            background: `linear-gradient(145deg, ${
              theme.palette.background.paper
            }, ${alpha(theme.palette.primary.light, 0.05)})`,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "& .MuiTextField-root": {
                my: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  width: 56,
                  height: 56,
                }}
              >
                <LocalGasStation fontSize="medium" />
              </Avatar>
              <Typography variant="h5" fontWeight="600">
                Новая заправка
              </Typography>
            </Stack>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Дата заправки"
                  type="date"
                  fullWidth
                  autoComplete="off"
                  autoCorrect="off"
                  required
                  error={fieldErrors.date}
                  helperText={fieldErrors.date ? "Укажите дату заправки" : ""}
                  value={record.date.toISOString().split("T")[0]}
                  onChange={(e) =>
                    updateField("date", new Date(e.target.value))
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Event color="action" />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Литры"
                  type="number"
                  fullWidth
                  autoComplete="off"
                  autoCorrect="off"
                  required
                  error={fieldErrors.liters}
                  helperText={
                    fieldErrors.liters ? "Введите положительное число" : ""
                  }
                  value={record.liters || ""}
                  onChange={(e) =>
                    updateField("liters", parseFloat(e.target.value))
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalGasStation color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">л</InputAdornment>
                    ),
                    inputProps: { step: "0.01", min: "0" },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Цена за литр"
                  type="number"
                  fullWidth
                  required
                  autoComplete="off"
                  autoCorrect="off"
                  error={fieldErrors.pricePerLiter}
                  helperText={
                    fieldErrors.pricePerLiter
                      ? "Введите положительное число"
                      : ""
                  }
                  value={record.pricePerLiter || ""}
                  onChange={(e) =>
                    updateField("pricePerLiter", parseFloat(e.target.value))
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">Сом</InputAdornment>
                    ),
                    inputProps: { step: "0.01", min: "0" },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Пробег"
                  type="number"
                  fullWidth
                  required
                  error={fieldErrors.odometer}
                  helperText={
                    fieldErrors.odometer ? "Введите положительное число" : ""
                  }
                  value={record.odometer || ""}
                  onChange={(e) =>
                    updateField("odometer", parseInt(e.target.value))
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DirectionsCar color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">км</InputAdornment>
                    ),
                    inputProps: { min: "0" },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Fade in={record.totalCost > 0}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: alpha(theme.palette.primary.light, 0.1),
                      borderRadius: 2,
                      textAlign: "center",
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )}`,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Typography variant="subtitle1" color="text.secondary">
                      Стоимость заправки
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight="700"
                      color="primary.main"
                      sx={{ mt: 1 }}
                    >
                      {record.totalCost.toFixed(2)} Сом
                    </Typography>
                  </Paper>
                </Fade>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Tooltip title="Очистить форму">
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<Refresh />}
                      onClick={handleReset}
                      sx={{ borderRadius: 2 }}
                    >
                      Сбросить
                    </Button>
                  </Tooltip>
                  <Tooltip title="Сохранить заправку">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={<Save />}
                      size="large"
                      sx={{
                        borderRadius: 2,
                        px: 4,
                        boxShadow: `0 4px 12px ${alpha(
                          theme.palette.primary.main,
                          0.2
                        )}`,
                        "&:hover": {
                          boxShadow: `0 6px 16px ${alpha(
                            theme.palette.primary.main,
                            0.3
                          )}`,
                        },
                      }}
                    >
                      Сохранить
                    </Button>
                  </Tooltip>
                </Stack>
              </Grid>
            </Grid>

            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={() => setOpenSnackbar(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              TransitionComponent={Fade}
            >
              <Alert
                severity="success"
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  boxShadow: theme.shadows[6],
                }}
                icon={
                  <Avatar sx={{ bgcolor: "success.main", mr: 1 }}>
                    <Save fontSize="small" />
                  </Avatar>
                }
              >
                <Typography variant="subtitle2">Данные сохранены!</Typography>
                <Typography variant="body2" color="text.secondary">
                  Заправка успешно добавлена в историю.
                </Typography>
              </Alert>
            </Snackbar>
          </Box>
        </Paper>
      </Zoom>
      <Zoom in={true} style={{ transitionDelay: "200ms" }}>
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 4,
            background: `linear-gradient(145deg, ${
              theme.palette.background.paper
            }, ${alpha(theme.palette.secondary.light, 0.05)})`,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <Avatar
              sx={{
                bgcolor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.secondary.main,
                width: 56,
                height: 56,
              }}
            >
              <History fontSize="medium" />
            </Avatar>
            <Typography variant="h5" fontWeight="600">
              История заправок
            </Typography>
          </Stack>

          {history.length > 0 ? (
            <>
              {/* Статистика */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: alpha(theme.palette.info.light, 0.1),
                      borderRadius: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Всего потрачено
                    </Typography>
                    <Typography variant="h6" fontWeight="700">
                      {totalSpent.toFixed(2)} Сом
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: alpha(theme.palette.success.light, 0.1),
                      borderRadius: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Всего литров
                    </Typography>
                    <Typography variant="h6" fontWeight="700">
                      {totalLiters.toFixed(1)} л
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: alpha(theme.palette.warning.light, 0.1),
                      borderRadius: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Средняя цена
                    </Typography>
                    <Typography variant="h6" fontWeight="700">
                      {avgPrice.toFixed(2)} Сом/л
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Таблица истории */}
              <TableContainer component={Paper} elevation={0}>
                <Table size="small">
                  <TableHead>
                    <TableRow
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                      }}
                    >
                      <TableCell>Дата</TableCell>
                      <TableCell align="right">Литры</TableCell>
                      <TableCell align="right">Цена за литр</TableCell>
                      <TableCell align="right">Сумма</TableCell>
                      <TableCell align="right">Пробег</TableCell>
                      <TableCell align="right">Действия</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history
                      .sort((a, b) => b.date.getTime() - a.date.getTime())
                      .map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            {record.date.toLocaleDateString()}
                          </TableCell>
                          <TableCell align="right">
                            {record.liters.toFixed(1)} л
                          </TableCell>
                          <TableCell align="right">
                            {record.pricePerLiter.toFixed(2)} Сом
                          </TableCell>
                          <TableCell align="right">
                            <Typography fontWeight="500">
                              {record.totalCost.toFixed(2)} Сом
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            {record.odometer} км
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="Удалить запись">
                              <IconButton
                                onClick={() => deleteFromHistory(record.id)}
                                size="small"
                                color="error"
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: "center",
                bgcolor: alpha(theme.palette.text.disabled, 0.03),
                borderRadius: 2,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                История заправок пуста. Добавьте первую запись!
              </Typography>
            </Paper>
          )}
        </Paper>
      </Zoom>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Fade}
      >
        <Alert
          severity="success"
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: theme.shadows[6],
          }}
          icon={
            <Avatar sx={{ bgcolor: "success.main", mr: 1 }}>
              <Save fontSize="small" />
            </Avatar>
          }
        >
          <Typography variant="subtitle2">Данные сохранены!</Typography>
          <Typography variant="body2" color="text.secondary">
            Заправка успешно добавлена в историю.
          </Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
};
