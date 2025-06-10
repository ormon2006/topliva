import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Paper,
  Chip,
  Divider,
  useTheme,
  IconButton,
  Tooltip
} from "@mui/material";
import { 
  LocalGasStation, 
  DirectionsCar, 
  GasMeter,
  PriceCheck,
  MyLocation 
} from "@mui/icons-material";

// Фикс для иконок маркеров
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Координаты центра Бишкека
const BISHKEK_CENTER = [42.8746, 74.5698] as [number, number];

// Тип данных АЗС
type GasStation = {
  id: number;
  name: string;
  lat: number;
  lon: number;
  brand?: string;
  fuel_price?: {
    ai92?: number;
    ai95?: number;
    diesel?: number;
  };
};

export const BishkekFuelMap = () => {
  const theme = useTheme();
  const [stations, setStations] = useState<GasStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedStation, setSelectedStation] = useState<GasStation | null>(null);

  // Цвета для разных брендов АЗС
  const brandColors: Record<string, string> = {
    "Gazprom": theme.palette.primary.main,
    "Lukoil": theme.palette.error.main,
    "Rosneft": theme.palette.success.main,
    "Shell": theme.palette.warning.main,
    "default": theme.palette.info.main
  };

  useEffect(() => {
    const fetchGasStations = async () => {
      try {
        // Запрос к Overpass API (OpenStreetMap)
        const response = await axios.get(
          `https://overpass-api.de/api/interpreter?data=[out:json];area[name="Бишкек"]->.a;(node(area.a)[amenity=fuel];out;`
        );

        const stationsData = response.data.elements.map((node: any) => ({
          id: node.id,
          name: node.tags?.name || "АЗС",
          lat: node.lat,
          lon: node.lon,
          brand: node.tags?.brand,
        }));

        setStations(stationsData);
      } catch (error) {
        console.error("Ошибка загрузки АЗС:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGasStations();

    // Получаем местоположение пользователя
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        (error) => {
          console.warn("Ошибка получения геолокации:", error);
        }
      );
    }
  }, []);

  // Кастомные иконки для разных брендов
  const createCustomIcon = (brand?: string) => {
    const color = brand ? brandColors[brand] || brandColors.default : brandColors.default;
    
    return L.divIcon({
      className: 'custom-icon',
      html: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32" height="32">
          <path d="M18 10h-1V4H7v6H6c-1.66 0-3 1.34-3 3v7h18v-7c0-1.66-1.34-3-3-3zm-9 0H9V6h2v4zm4 0h-2V6h2v4z"/>
        </svg>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  // Сортировка по расстоянию (если известно местоположение)
  const sortedStations = useMemo(() => {
    if (!userLocation) return stations;
    
    return [...stations].sort((a, b) => {
      const distA = getDistance(userLocation, [a.lat, a.lon]);
      const distB = getDistance(userLocation, [b.lat, b.lon]);
      return distA - distB;
    });
  }, [stations, userLocation]);

  const getDistance = ([lat1, lon1]: [number, number], [lat2, lon2]: [number, number]) => {
    const R = 6371; // Радиус Земли в км
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  const mapCenter = selectedStation ? 
    [selectedStation.lat, selectedStation.lon] : 
    (userLocation || BISHKEK_CENTER);

  return (
    <Paper
      elevation={3}
      sx={{ 
        height: "500px", 
        borderRadius: 3, 
        overflow: "hidden",
        position: 'relative',й
        maxWidth: "800px", mx: "auto", my: 4 
      }}
    >
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <MapContainer
            center={mapCenter}
            zoom={selectedStation ? 15 : 13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {/* Местоположение пользователя */}
            {userLocation && (
              <Circle
                center={userLocation}
                color={theme.palette.primary.main}
                fillOpacity={0.2}
              />
            )}

            {/* АЗС */}
            {sortedStations.map((station) => (
              <Marker
                key={station.id}
                position={[station.lat, station.lon]}
                icon={createCustomIcon(station.brand)}
                eventHandlers={{
                  click: () => setSelectedStation(station),
                }}
              >
                <Popup>
                  <Box sx={{ minWidth: 200 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocalGasStation fontSize="small" sx={{ 
                        color: station.brand ? brandColors[station.brand] : brandColors.default,
                        mr: 1 
                      }} />
                      {station.name}
                    </Typography>
                    
                    {station.brand && (
                      <Chip 
                        label={station.brand} 
                        size="small" 
                        sx={{ 
                          mb: 1,
                          backgroundColor: brandColors[station.brand] || brandColors.default,
                          color: theme.palette.getContrastText(brandColors[station.brand] || brandColors.default)
                        }} 
                      />
                    )}
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <DirectionsCar fontSize="small" color="action" />
                      <Typography variant="body2">
                        Расстояние: {userLocation ? 
                          `${getDistance(userLocation, [station.lat, station.lon]).toFixed(1)} км` : 
                          'неизвестно'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <GasMeter fontSize="small" color="action" />
                      <Typography variant="body2">
                        Координаты: {station.lat.toFixed(4)}, {station.lon.toFixed(4)}
                      </Typography>
                    </Box>
                    
                    {station.fuel_price && (
                      <>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PriceCheck fontSize="small" /> Цены:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                          {station.fuel_price.ai92 && (
                            <Chip label={`АИ-92: ${station.fuel_price.ai92} KGS`} size="small" />
                          )}
                          {station.fuel_price.ai95 && (
                            <Chip label={`АИ-95: ${station.fuel_price.ai95} KGS`} size="small" />
                          )}
                          {station.fuel_price.diesel && (
                            <Chip label={`Дизель: ${station.fuel_price.diesel} KGS`} size="small" />
                          )}
                        </Box>
                      </>
                    )}
                  </Box>
                </Popup>
              </Marker>
            ))}
            
            {/* Выделение выбранной АЗС */}
            {selectedStation && (
              <Circle
                center={[selectedStation.lat, selectedStation.lon]}
                color={theme.palette.warning.main}
                fillOpacity={0.1}
                weight={2}
              />
            )}
          </MapContainer>
          
          {/* Кнопка центрирования */}
          <Tooltip title="Центрировать карту">
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                zIndex: 1000,
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[4],
                '&:hover': {
                  backgroundColor: theme.palette.grey[200]
                }
              }}
              onClick={() => setSelectedStation(null)}
            >
              <MyLocation />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Paper>
  );
};