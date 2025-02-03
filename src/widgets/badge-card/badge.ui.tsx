import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box
} from '@mui/material';

type BadgeCardProps = {
  image: string;
  title: string;
  description: string;
  rarity: string;
};

const rarityColors = [
  {
    rarity: 'Обычная',
    chipStyle: 'bg-[#6276CD]/80 text-white',
    shadowStyle: 'shadow-[0_0_10px_3px_rgba(98,118,205,0.8)]',
  },
  {
    rarity: 'Редкая',
    chipStyle: 'bg-sun text-tundora',
    shadowStyle: 'hover:shadow-[0_0_10px_3px_rgba(255,206,82,0.8)]',
  },
  {
    rarity: 'Эпическая',
    chipStyle: 'bg-[#3b039e] text-white',
    shadowStyle: 'hover:shadow-[0_0_10px_0px_rgba(59,3,158,0.8)]',
  },
  {
    rarity: 'Легендарная',
    chipStyle: 'bg-gradient-to-r from-[#8A2BE2] to-blue text-white',
    shadowStyle:
      'hover:shadow-[0_0_15px_0px_rgba(138,43,226,0.8),0_0_20px_0px_rgba(0,0,255,0.6)]',
  },
  {
    rarity: 'Мифическая',
    chipStyle: 'bg-gradient-to-l from-red to-sun text-white',
    shadowStyle:
      'hover:shadow-[0_0_15px_0px_rgba(255,0,0,0.8),0_0_20px_0px_rgba(255,206,82,0.6)]',
  },
  {
    rarity: 'Эксклюзивная',
    chipStyle: 'bg-gradient-to-l from-[#00188f] to-[#ec008c] text-white',
    shadowStyle:
      'hover:shadow-[0_0_15px_0px_rgba(0,24,143,0.8),0_0_20px_0px_rgba(236,0,140,0.6)]',
  },
];

export function BadgeCard({
  image,
  title,
  description,
  rarity,
}: BadgeCardProps) {
  const rarityStyle = rarityColors.find((r) => r.rarity === rarity);

  return (
    <Card
      className={`shadow-none rounded-lg min-w-[120px] max-h-[150px] min-h-[150px] max-w-[120px] border border-alto overflow-hidden flex flex-col items-center  transition duration-300   ${
        rarityStyle?.shadowStyle || ''
      }`}
    >
      <Box className="relative">
        <img
          src={image}
          alt={title}
          className="h-[100px] object-cover"
        />
        <Chip
          label={rarity}
          className={`absolute bottom-[-5px] text-[10px] left-2 ${
            rarityStyle?.chipStyle || ''
          } font-bold`}
          size="small"
        />
      </Box>
      <CardContent className="flex flex-col items-center p-0 pb-2 mt-2">
        <Typography className="font-semibold text-[12px] text-center leading-4 mb-2">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
