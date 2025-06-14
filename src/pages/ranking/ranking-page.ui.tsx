import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Pagination,
  ToggleButtonGroup,
  ToggleButton,
  Container,
  LinearProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  Search,
  LocalGasStation,
  ArrowUpward,
  ArrowDownward,
  Star,
  StarHalf,
  LocationOn,
  Info,
  Refresh,
  FilterAlt,
} from "@mui/icons-material";
import { useState } from "react";
import { styled } from "@mui/material/styles";

// Стилизованные компоненты
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const PriceCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  color:
    theme.palette.mode === "dark"
      ? theme.palette.success.light
      : theme.palette.success.dark,
}));

const RatingCell = styled(TableCell)({
  minWidth: 120,
});

// Типы данных
type Station = {
  id: number;
  name: string;
  brand: string;
  address: string;
  ai92: number;
  ai95: number;
  diesel: number;
  rating: number;
  distance: number;
  promotions?: string[];
};

export const RatingPage = () => {
  const [sortField, setSortField] = useState<"price" | "rating" | "distance">(
    "price"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [fuelType, setFuelType] = useState<"ai92" | "ai95" | "diesel">("ai95");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Имитация данных АЗС с акциями
  const stations: Station[] = [
    {
      id: 1,
      name: "Лукойл",
      brand: "lukoil",
      address: "ул. Ленина, 15",
      ai92: 45.2,
      ai95: 49.8,
      diesel: 52.1,
      rating: 4.8,
      distance: 1.2,
    },
    {
      id: 2,
      name: "Роснефть",
      brand: "rosneft",
      address: "пр. Мира, 42",
      ai92: 44.9,
      ai95: 49.5,
      diesel: 51.8,
      rating: 4.6,
      distance: 2.5,
    },
    {
      id: 3,
      name: "Газпромнефть",
      brand: "gazprom",
      address: "ул. Гагарина, 8",
      ai92: 45.5,
      ai95: 50.2,
      diesel: 52.5,
      rating: 4.9,
      distance: 3.1,
    },
    {
      id: 4,
      name: "Татнефть",
      brand: "tatneft",
      address: "ул. Советская, 33",
      ai92: 44.7,
      ai95: 49.3,
      diesel: 51.6,
      rating: 4.5,
      distance: 0.8,
    },
    {
      id: 5,
      name: "Shell",
      brand: "shell",
      address: "ш. Энтузиастов, 12",
      ai92: 46.1,
      ai95: 50.8,
      diesel: 53.2,
      rating: 4.7,
      distance: 4.2,
    },
    {
      id: 6,
      name: "BP",
      brand: "bp",
      address: "ул. Победы, 10",
      ai92: 45.0,
      ai95: 49.6,
      diesel: 52.0,
      rating: 4.4,
      distance: 5.0,
    },
    {
      id: 7,
      name: "Нефтьмагистраль",
      brand: "neftmag",
      address: "пр. Победы, 22",
      ai92: 44.6,
      ai95: 49.1,
      diesel: 51.5,
      rating: 4.3,
      distance: 3.7,
    },
    {
      id: 8,
      name: "Сургутнефтегаз",
      brand: "surgut",
      address: "ул. Молодежная, 5",
      ai92: 45.3,
      ai95: 50.0,
      diesel: 52.3,
      rating: 4.6,
      distance: 6.1,
    },
    {
      id: 9,
      name: "Neste",
      brand: "neste",
      address: "ул. Центральная, 77",
      ai92: 46.5,
      ai95: 51.0,
      diesel: 53.5,
      rating: 4.7,
      distance: 2.9,
    },
    {
      id: 10,
      name: "Total",
      brand: "total",
      address: "пр. Ломоносова, 9",
      ai92: 45.9,
      ai95: 50.4,
      diesel: 52.9,
      rating: 4.5,
      distance: 4.4,
    },
    {
      id: 11,
      name: "Славнефть",
      brand: "slavneft",
      address: "ул. Кирова, 50",
      ai92: 44.8,
      ai95: 49.2,
      diesel: 51.7,
      rating: 4.4,
      distance: 3.3,
    },
    {
      id: 12,
      name: "Газойл",
      brand: "gasoil",
      address: "ул. Парковая, 12",
      ai92: 45.1,
      ai95: 49.7,
      diesel: 52.2,
      rating: 4.2,
      distance: 1.5,
    },
    {
      id: 13,
      name: "ЕКА",
      brand: "eka",
      address: "ул. Новая, 18",
      ai92: 45.4,
      ai95: 49.9,
      diesel: 52.4,
      rating: 4.3,
      distance: 5.7,
    },
    {
      id: 14,
      name: "ТНК",
      brand: "tnk",
      address: "ул. Южная, 24",
      ai92: 45.7,
      ai95: 50.1,
      diesel: 52.6,
      rating: 4.4,
      distance: 7.0,
    },
    {
      id: 15,
      name: "РТК",
      brand: "rtk",
      address: "ул. Зеленая, 30",
      ai92: 45.8,
      ai95: 50.3,
      diesel: 52.7,
      rating: 4.3,
      distance: 2.2,
    },
  ];

  // Имитация загрузки
  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  // Сортировка данных
  const sortedStations = [...stations].sort((a, b) => {
    if (sortField === "price") {
      return sortDirection === "asc"
        ? a[fuelType] - b[fuelType]
        : b[fuelType] - a[fuelType];
    } else if (sortField === "rating") {
      return sortDirection === "asc"
        ? a.rating - b.rating
        : b.rating - a.rating;
    } else {
      return sortDirection === "asc"
        ? a.distance - b.distance
        : b.distance - a.distance;
    }
  });

  // Фильтрация по поиску
  const filteredStations = sortedStations.filter(
    (station) =>
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Пагинация
  const itemsPerPage = 5;
  const count = Math.ceil(filteredStations.length / itemsPerPage);
  const paginatedStations = filteredStations.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleSort = (field: "price" | "rating" | "distance") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    simulateLoading();
  };

 const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} fontSize="small" sx={{ color: '#f5c542' }} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalf key={i} fontSize="small" sx={{ color: '#f5c542' }} />);
      } else {
        stars.push(<Star key={i} fontSize="small" sx={{ color: '#e5e5e5' }} />);
      }
    }

    return (
      <Box display="flex" alignItems="center">
        {stars}
        <Typography variant="body2" ml={0.5} color="text.secondary">
          ({rating.toFixed(1)})
        </Typography>
      </Box>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {loading && <LinearProgress sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0,
        backgroundColor: 'grey.100',
        '& .MuiLinearProgress-bar': {
          backgroundColor: 'grey.400'
        }
      }} />}
      
      {/* Заголовок */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 600,
          color: 'grey.900',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <LocalGasStation sx={{ 
            color: 'grey.700',
            fontSize: '2rem'
          }} />
          Топливный рейтинг
        </Typography>
        <Typography variant="body1" color="grey.600" sx={{ mt: 1 }}>
          Актуальные цены на топливо в вашем городе
        </Typography>
      </Box>

      {/* Панель поиска */}
      <Paper elevation={0} sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200',
        backgroundColor: 'grey.50'
      }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Найти АЗС..."
            variant="outlined"
            size="medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'grey.500' }} />
                </InputAdornment>
              ),
              sx: { 
                borderRadius: 1,
                backgroundColor: 'white'
              }
            }}
            sx={{ flex: 1, minWidth: 300 }}
          />

          <ToggleButtonGroup
            value={fuelType}
            exclusive
            onChange={(_, newType) => newType && setFuelType(newType)}
            size="medium"
            sx={{
              '& .MuiToggleButton-root': {
                borderRadius: 1,
                px: 3,
                fontWeight: 500,
                borderColor: 'grey.300',
                color: 'grey.700',
                '&.Mui-selected': {
                  color: 'grey.900',
                  backgroundColor: 'grey.200',
                  borderColor: 'grey.300',
                  '&:hover': {
                    backgroundColor: 'grey.300'
                  }
                }
              }
            }}
          >
            <ToggleButton value="ai92">АИ-92</ToggleButton>
            <ToggleButton value="ai95">АИ-95</ToggleButton>
            <ToggleButton value="diesel">Дизель</ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Обновить">
              <IconButton 
                onClick={simulateLoading}
                sx={{ 
                  border: '1px solid',
                  borderColor: 'grey.300',
                  color: 'grey.700'
                }}
              >
                <Refresh />
              </IconButton>
            </Tooltip>
            <Tooltip title="Фильтры">
              <IconButton 
                sx={{ 
                  border: '1px solid',
                  borderColor: 'grey.300',
                  color: 'grey.700'
                }}
              >
                <FilterAlt />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>

      {/* Таблица */}
      <Paper elevation={0} sx={{ 
        mb: 4, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200',
        overflow: 'hidden'
      }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: 'grey.100',
                '& th': {
                  color: 'grey.900',
                  fontWeight: 600,
                  borderColor: 'grey.200'
                }
              }}>
                <TableCell sx={{ width: '30%' }}>
                  <Box display="flex" alignItems="center">
                    <LocationOn sx={{ mr: 1, color: 'grey.600' }} />
                    АЗС
                  </Box>
                </TableCell>
                <PriceCell 
                  align="right"
                  sx={{ cursor: 'pointer', minWidth: 180 }}
                  onClick={() => handleSort('price')}
                >
                  <Box display="flex" alignItems="center" justifyContent="flex-end">
                    Цена ({fuelType === 'ai92' ? 'АИ-92' : fuelType === 'ai95' ? 'АИ-95' : 'Дизель'})
                    {sortField === 'price' && (
                      sortDirection === 'asc' ? 
                        <ArrowUpward fontSize="small" sx={{ ml: 1, color: 'grey.600' }} /> : 
                        <ArrowDownward fontSize="small" sx={{ ml: 1, color: 'grey.600' }} />
                    )}
                  </Box>
                </PriceCell>
                <RatingCell 
                  align="center"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleSort('rating')}
                >
                  <Box display="flex" alignItems="center" justifyContent="center">
                    Рейтинг
                    {sortField === 'rating' && (
                      sortDirection === 'asc' ? 
                        <ArrowUpward fontSize="small" sx={{ ml: 1, color: 'grey.600' }} /> : 
                        <ArrowDownward fontSize="small" sx={{ ml: 1, color: 'grey.600' }} />
                    )}
                  </Box>
                </RatingCell>
                <TableCell 
                  align="right"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleSort('distance')}
                >
                  <Box display="flex" alignItems="center" justifyContent="flex-end">
                    Расстояние
                    {sortField === 'distance' && (
                      sortDirection === 'asc' ? 
                        <ArrowUpward fontSize="small" sx={{ ml: 1, color: 'grey.600' }} /> : 
                        <ArrowDownward fontSize="small" sx={{ ml: 1, color: 'grey.600' }} />
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                // Скелетоны при загрузке
                Array.from({ length: 5 }).map((_, index) => (
                  <StyledTableRow key={index}>
                    <TableCell colSpan={4}>
                      <Skeleton variant="rectangular" height={60} />
                    </TableCell>
                  </StyledTableRow>
                ))
              ) : (
                paginatedStations.map((station) => (
                  <StyledTableRow key={station.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar 
                          src={`/${station.brand}.png`} 
                          alt={station.name}
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            mr: 2,
                            border: '1px solid',
                            borderColor: 'grey.300'
                          }}
                        />
                        <Box>
                          <Typography fontWeight={600} color="grey.900">
                            {station.name}
                          </Typography>
                          <Typography variant="body2" color="grey.600" sx={{ mt: 0.5 }}>
                            {station.address}
                          </Typography>
                          {station.promotions && (
                            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {station.promotions.map((promo, i) => (
                                <Chip
                                  key={i}
                                  label={promo}
                                  size="small"
                                  sx={{ 
                                    borderRadius: 0.5,
                                    fontSize: '0.65rem',
                                    height: 20,
                                    backgroundColor: 'grey.200',
                                    color: 'grey.800'
                                  }}
                                />
                              ))}
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <PriceCell align="right">
                      <Typography fontWeight={600} color="grey.900">
                        {station[fuelType]} сом
                      </Typography>
                      <Box display="flex" justifyContent="flex-end" gap={0.5} mt={0.5}>
                        <Chip 
                          label={`92: ${station.ai92} сом`} 
                          size="small" 
                          variant="outlined"
                          sx={{ 
                            fontSize: '0.65rem',
                            fontWeight: fuelType === 'ai92' ? 600 : 400,
                            borderColor: 'grey.300',
                            color: fuelType === 'ai92' ? 'grey.900' : 'grey.600'
                          }}
                        />
                        <Chip 
                          label={`95: ${station.ai95} сом`} 
                          size="small" 
                          variant="outlined"
                          sx={{ 
                            fontSize: '0.65rem',
                            fontWeight: fuelType === 'ai95' ? 600 : 400,
                            borderColor: 'grey.300',
                            color: fuelType === 'ai95' ? 'grey.900' : 'grey.600'
                          }}
                        />
                        <Chip 
                          label={`Диз: ${station.diesel} сом`} 
                          size="small" 
                          variant="outlined"
                          sx={{ 
                            fontSize: '0.65rem',
                            fontWeight: fuelType === 'diesel' ? 600 : 400,
                            borderColor: 'grey.300',
                            color: fuelType === 'diesel' ? 'grey.900' : 'grey.600'
                          }}
                        />
                      </Box>
                    </PriceCell>
                    <RatingCell align="center">
                      {renderStars(station.rating)}
                    </RatingCell>
                    <TableCell align="right">
                      <Box display="flex" alignItems="center" justifyContent="flex-end">
                        <Typography variant="body1" fontWeight={500} color="grey.800">
                          {station.distance} км
                        </Typography>
                        <LocationOn sx={{ ml: 0.5, color: 'grey.500' }} />
                      </Box>
                    </TableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Пагинация */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        mb: 4
      }}>
        <Typography variant="body2" color="grey.600">
          Показано {paginatedStations.length} из {filteredStations.length} АЗС
        </Typography>
        
        <Pagination
          count={count}
          page={page}
          onChange={(_, value) => setPage(value)}
          shape="rounded"
          size="large"
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'grey.700',
              borderColor: 'grey.300',
              '&.Mui-selected': {
                backgroundColor: 'grey.200',
                color: 'grey.900',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'grey.300'
                }
              }
            }
          }}
        />
      </Box>

      {/* Подсказка */}
      <Paper elevation={0} sx={{ 
        p: 3, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200',
        backgroundColor: 'grey.50'
      }}>
        <Box display="flex" alignItems="flex-start" gap={2}>
          <Info sx={{ color: 'grey.600', mt: 0.5 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight={500} color="grey.900" gutterBottom>
              Как использовать рейтинг?
            </Typography>
            <Typography variant="body2" color="grey.700">
              • Кликните на заголовок колонки для сортировки<br />
              • Используйте фильтры для выбора типа топлива<br />
              • Наведите на рейтинг для подробной информации<br />
              • Данные обновляются ежедневно в 10:00
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
