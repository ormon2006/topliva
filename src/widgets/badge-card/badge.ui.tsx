import { Card, CardContent, Typography, Chip, Box } from '@mui/material';

type BadgeCardProps = {
  image: string;
  title: string;
  description: string;
  rarity: string;
};

const rarityColors = {
  Common: 'bg-gray-300 text-gray-800',
  Rare: 'bg-blue-300 text-blue-800',
  Epic: 'bg-purple-300 text-purple-800',
  Legendary: 'bg-yellow-300 text-yellow-800',
};

export function BadgeCard({
  image,
  title,
  description,
  rarity,
}: BadgeCardProps) {
  return (
    <Card className="shadow-none border border-alto rounded-lg overflow-hidden max-w-[320px] min-w-[320px] ">
      <Box className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[200px] object-cover"
        />
        <Chip
          label={rarity}
          className={`absolute top-2 left-2 ${rarityColors[rarity]} font-bold`}
          size="small"
        />
      </Box>
      <CardContent className="flex flex-col items-center p-4">
        <Typography variant="h6" className="font-semibold text-center">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className="text-center mt-2"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
