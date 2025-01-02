import { EmojiEvents } from '@mui/icons-material';
import { Avatar, Typography, Paper, Chip } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import GroupIcon from '@mui/icons-material/Group';
import { BadgeCard } from '~widgets/badge-card';

interface Achievement {
  id: number;
  title: string;
  description: string;
  image: string;
  rarity: string;
}

interface Profile {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  photo_url: string;
  group_id: string;
  points: number;
  achievements: Achievement[];
}

const profileData: Profile = {
  username: 'maksat.up',
  email: 'student@example.com',
  first_name: 'Максат',
  last_name: 'Каныбеков',
  photo_url: 'https://api.makalabox.com/media/user_photos/profile4_5vTShTk.jpg',
  group_id: 'ПОВТ-1-20',
  points: 1200,
  achievements: [
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
      rarity: 'Легендарная',
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
      rarity: 'Эпическая',
    },
  ],
};

export function ProfilePage() {
  return (
    <div className="my-10">
      <Paper
        elevation={3}
        sx={{ padding: 3 }}
        className="shadow-none border border-alto"
      >
        <div className="items-center">
          <div className="flex flex-col items-center">
            <Avatar
              alt="User Photo"
              src={profileData.photo_url}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="body2" color="textSecondary" className="mt-2">
              @{profileData.username}
            </Typography>
            <Typography variant="h6" className="text-center">
              {profileData.first_name} {profileData.last_name}
            </Typography>
          </div>

          <div className="mt-5 flex flex-col items-center">
            <div className="flex flex-col gap-4 ">
              <div className="flex gap-4">
                <Paper
                  className="max-w-[150px] min-w-[150px] shadow-none border border-alto"
                  elevation={2}
                  sx={{
                    padding: 1,
                    backgroundColor: '#e3f2fd',
                  }}
                >
                  <Chip
                    label={profileData.group_id}
                    color="primary"
                    className="text-white font-bold"
                    icon={<GroupIcon className="text-alto" />}
                  />
                  <p className="text-[15px] font-bold text-tundora">Группа</p>
                </Paper>
                <Paper
                  className="max-w-[150px] min-w-[150px] shadow-none border border-alto"
                  elevation={2}
                  sx={{
                    padding: 1,
                    backgroundColor: '#f1f8e9',
                    flex: 1,
                  }}
                >
                  <Chip
                    label="1"
                    color="success"
                    className="text-white font-bold"
                    icon={<EmojiEvents className="text-sun" />}
                  />
                  <p className="text-[15px] font-bold text-tundora">Рейтинг</p>
                </Paper>
              </div>
              <div className="flex gap-4">
                <Paper
                  className="max-w-[150px] min-w-[150px] shadow-none border border-alto"
                  elevation={2}
                  sx={{
                    padding: 1,
                    backgroundColor: '#fff3e0',
                    flex: 1,
                  }}
                >
                  <Chip
                    label={profileData.achievements.length}
                    color="warning"
                    className="text-white font-bold"
                    icon={<WorkspacePremiumIcon />}
                  />
                  <p className="text-[15px] font-bold text-tundora">
                    Достижений
                  </p>
                </Paper>
                <Paper
                  className="max-w-[150px] min-w-[150px] shadow-none border border-alto"
                  elevation={2}
                  sx={{
                    padding: 1,
                    backgroundColor: '#fff3e0',
                  }}
                >
                  <Chip
                    label={profileData.points}
                    className="bg-cinnabar text-white font-bold"
                    icon={<ElectricBoltIcon className="text-yellow" />}
                  />
                  <p className="text-[15px] font-bold text-tundora">Баллов</p>
                </Paper>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center">
            <Typography
              variant="h6"
              className="text-center font-semibold text-tundora"
            >
              Достижения
            </Typography>
            <div className="flex flex-col items-center gap-5">
              {profileData.achievements.map((achievement) => (
                <BadgeCard
                  key={achievement.id}
                  image={achievement.image}
                  title={achievement.title}
                  description={achievement.description}
                  rarity={achievement.rarity}
                />
              ))}
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}
