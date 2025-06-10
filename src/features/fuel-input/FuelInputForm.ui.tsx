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
    <Box sx={{ maxWidth: "800px", mx: "auto", my: 4 }} className="space-y-2">
      {/* Форма заправки */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ "& > *": { mb: 2 } }}
          className="space-y-4"
        >
          <TextField
            label="Дата заправки"
            type="date"
            fullWidth
            required
            autoComplete="off"
            autoCorrect="off"
            error={fieldErrors.date}
            helperText={fieldErrors.date && "Укажите дату заправки"}
            value={record.date.toISOString().split("T")[0]}
            onChange={(e) => updateField("date", new Date(e.target.value))}
            InputProps={{
              startAdornment: <Event color="action" sx={{ mr: 1 }} />,
            }}
            InputLabelProps={{ shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#121212",
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

          <Box display="flex" gap={2}>
            <TextField
              label="Литры"
              type="number"
              fullWidth
              required
              autoComplete="off"
              autoCorrect="off"
              error={fieldErrors.liters}
              helperText={fieldErrors.liters && "Введите положительное число"}
              value={record.liters || ""}
              onChange={(e) =>
                updateField("liters", parseFloat(e.target.value))
              }
              InputProps={{
                startAdornment: (
                  <LocalGasStation color="action" sx={{ mr: 1 }} />
                ),
                endAdornment: "л",
                inputProps: { step: "0.01", min: "0" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#121212",
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

            <TextField
              label="Цена за литр"
              type="number"
              fullWidth
              required
              autoComplete="off"
              autoCorrect="off"
              error={fieldErrors.pricePerLiter}
              helperText={
                fieldErrors.pricePerLiter && "Введите положительное число"
              }
              value={record.pricePerLiter || ""}
              onChange={(e) =>
                updateField("pricePerLiter", parseFloat(e.target.value))
              }
              InputProps={{
                startAdornment: <AttachMoney color="action" sx={{ mr: 1 }} />,
                endAdornment: "Сом",
                inputProps: { step: "0.01", min: "0" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#121212",
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
          </Box>

          <TextField
            label="Пробег"
            type="number"
            fullWidth
            required
            autoComplete="off"
            autoCorrect="off"
            error={fieldErrors.odometer}
            helperText={fieldErrors.odometer && "Введите положительное число"}
            value={record.odometer || ""}
            onChange={(e) => updateField("odometer", parseInt(e.target.value))}
            InputProps={{
              startAdornment: <DirectionsCar color="action" sx={{ mr: 1 }} />,
              endAdornment: "км",
              inputProps: { min: "0" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#121212",
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

          {record.totalCost > 0 && (
            <Box
              textAlign="center"
              p={2}
              bgcolor="action.hover"
              borderRadius={1}
            >
              <Typography variant="body2">Стоимость заправки</Typography>
              <Typography variant="h6" color="primary">
                {record.totalCost.toFixed(2)} Сом
              </Typography>
            </Box>
          )}

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              color="dart"
              className="normal-case"
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleReset}
            >
              Сбросить
            </Button>
            <Button
              type="submit"
              color="dart"
              className="normal-case"
              variant="contained"
              startIcon={<Save />}
            >
              Сохранить
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* История заправок */}
      <Paper sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <History color="dart" sx={{ mr: 2, fontSize: 32 }} />
          <Typography variant="h6">История заправок</Typography>
        </Box>

        {history.length > 0 ? (
          <>
            <Box display="flex" gap={2} mb={3}>
              <Box
                flex={1}
                p={2}
                bgcolor="action.hover"
                borderRadius={1}
                textAlign="center"
              >
                <Typography variant="body2">Всего потрачено</Typography>
                <Typography variant="subtitle1">
                  {totalSpent.toFixed(0)} Сом
                </Typography>
              </Box>
              <Box
                flex={1}
                p={2}
                bgcolor="action.hover"
                borderRadius={1}
                textAlign="center"
              >
                <Typography variant="body2">Всего литров</Typography>
                <Typography variant="subtitle1">
                  {totalLiters.toFixed(1)} л
                </Typography>
              </Box>
              <Box
                flex={1}
                p={2}
                bgcolor="action.hover"
                borderRadius={1}
                textAlign="center"
              >
                <Typography variant="body2">Средняя цена</Typography>
                <Typography variant="subtitle1">
                  {avgPrice.toFixed(0)} Сом/л
                </Typography>
              </Box>
            </Box>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Дата</TableCell>
                  <TableCell align="right">Литры</TableCell>
                  <TableCell align="right">Цена</TableCell>
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
                      <TableCell>{record.date.toLocaleDateString()}</TableCell>
                      <TableCell align="right">
                        {record.liters.toFixed(1)} л
                      </TableCell>
                      <TableCell align="right">
                        {record.pricePerLiter.toFixed(0)} Сом
                      </TableCell>
                      <TableCell align="right">
                        {record.totalCost.toFixed(0)} Сом
                      </TableCell>
                      <TableCell align="right">{record.odometer} км</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => deleteFromHistory(record.id)}
                          size="small"
                          color="error"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <Box p={4} textAlign="center" bgcolor="action.hover" borderRadius={1}>
            <Typography>
              История заправок пуста. Добавьте первую запись!
            </Typography>
          </Box>
        )}
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          Данные сохранены! Заправка успешно добавлена в историю.
        </Alert>
      </Snackbar>
    </Box>
  );
};
