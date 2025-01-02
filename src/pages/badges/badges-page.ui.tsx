import { Box, Chip, Tooltip, Typography } from '@mui/material';
import { Title } from '~shared/ui/title';
import { BadgeCard } from '~widgets/badge-card';

const badges = [
  {
    id: 1,
    image: '/bade_1.svg',
    title: 'Мастер домашек',
    description: 'Не пропускайте 5 домашек подряд.',
    rarity: 'Эпическая',
  },
  {
    id: 3,
    image: '/team.svg',
    title: 'Командный игрок',
    description: 'Примите участие в 10 командных проектах.',
    rarity: 'Мифическая',
  },
  {
    id: 5,
    image: '/mentor.svg',
    title: 'Наставник',
    description: 'Помогите 10 коллегам в их проектах.',
    rarity: 'Легендарная',
  },
  {
    id: 7,
    image: '/success.svg',
    title: 'Перфекционист',
    description: 'Получите 100% результат в 5 проектах.',
    rarity: 'Эксклюзивная',
  },
];

const rarityColors = [
  {
    rarity: 'Обычная',
    style: 'bg-[#6276CD]/80 text-white',
    description: 'Самая простая редкость, легко доступная.',
    probability: '60%',
    difficulty: 'Легко',
  },
  {
    rarity: 'Редкая',
    style: 'bg-sun text-tundora',
    description: 'Встречается реже, требует некоторых усилий.',
    probability: '25%',
    difficulty: 'Средняя',
  },
  {
    rarity: 'Эпическая',
    style: 'bg-[#3b039e] text-white',
    description: 'Довольно редкая, требует много времени и ресурсов.',
    probability: '10%',
    difficulty: 'Сложно',
  },
  {
    rarity: 'Легендарная',
    style: 'bg-gradient-to-r from-[#8A2BE2] to-70% to-blue text-white',
    description: 'Очень редкая, доступна только лучшим.',
    probability: '4%',
    difficulty: 'Очень сложно',
  },
  {
    rarity: 'Мифическая',
    style: 'bg-gradient-to-l from-red to-sun text-white',
    description: 'Практически невозможная для получения.',
    probability: '0.9%',
    difficulty: 'Экстремально сложно',
  },
  {
    rarity: 'Эксклюзивная',
    style: 'bg-gradient-to-l from-[#00188f] to-[#ec008c] text-white',
    description: 'Выдается только в уникальных условиях.',
    probability: '0.1%',
    difficulty: 'Уникально',
  },
];

export function BadgesPage() {
  return (
    <>
      <Title>Доска достижений</Title>
      <h5 className="font-bold my-3 text-[20px] text-tundora">
        Редкость достижений:
      </h5>
      <div className="flex gap-4 mb-10">
        {rarityColors.map(
          ({ rarity, style, description, probability, difficulty }) => (
            <Tooltip
              key={rarity}
              title={
                <Box>
                  <Typography variant="body2">
                    <strong>Описание:</strong> {description}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Вероятность:</strong> {probability}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Сложность:</strong> {difficulty}
                  </Typography>
                </Box>
              }
            >
              <Chip
                label={rarity}
                className={`${style} font-bold px-2 transition duration-300 hover:cursor-pointer  hover:shadow-xl hover:scale-95`}
              />
            </Tooltip>
          )
        )}
      </div>
      <h5 className="font-bold my-3 text-[20px] text-tundora">
        Мои достижения:
      </h5>
      <div className="flex flex-wrap gap-10 my-5">
        {badges.map((achievement) => (
          <BadgeCard
            key={achievement.id}
            image={achievement.image}
            title={achievement.title}
            description={achievement.description}
            rarity={achievement.rarity}
          />
        ))}
      </div>
    </>
  );
}
