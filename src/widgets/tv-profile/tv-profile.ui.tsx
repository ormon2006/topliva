import { Avatar, Chip, Paper, Typography } from '@mui/material';
import { BadgeCard } from '~widgets/badge-card';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';

export const TvProfile = ({ userData }) => {
  return (
    <div className="my-20 max-w-[1020px]">
      <Paper
        elevation={6}
        sx={{ padding: 6 }}
        className="shadow-lg border min-w-[1020px] border-alto"
      >
        <div className="items-center">
          <div className="flex flex-col items-center">
            <Avatar
              alt="User Photo"
              src={userData.data.photo}
              sx={{ width: 300, height: 300 }}
            />
            <Typography variant="h5" color="textSecondary" className="mt-6">
              @{userData.data.username}
            </Typography>
            <Typography variant="h3" className="text-center font-bold">
              {userData.data.firstName} {userData.data.lastName}
            </Typography>
          </div>

          <div className="mt-10 flex flex-col items-center">
            <div className="flex flex-col gap-12">
              <div className="flex gap-12">
                <Paper
                  className="max-w-[450px] min-w-[450px] shadow-lg border border-alto"
                  elevation={4}
                  sx={{
                    padding: 3,
                    backgroundColor: '#e3f2fd',
                  }}
                >
                  <Chip
                    label={userData.data.group}
                    color="primary"
                    className="text-white text-2xl font-bold px-4 py-2"
                    icon={<GroupIcon className="text-alto" />}
                  />
                  <p className="text-3xl font-bold text-tundora mt-4">Группа</p>
                </Paper>
                <Paper
                  className="max-w-[450px] min-w-[450px] shadow-lg border border-alto"
                  elevation={4}
                  sx={{
                    padding: 3,
                    backgroundColor: '#f1f8e9',
                  }}
                >
                  <Chip
                    label={userData.data.rating}
                    color="success"
                    className="text-white text-2xl font-bold px-4 py-2"
                    icon={<EmojiEventsIcon className="text-sun" />}
                  />
                  <p className="text-3xl font-bold text-tundora mt-4">Рейтинг</p>
                </Paper>
              </div>
              <div className="flex gap-12">
                <Paper
                  className="max-w-[450px] min-w-[450px] shadow-lg border border-alto"
                  elevation={4}
                  sx={{
                    padding: 3,
                    backgroundColor: '#fff3e0',
                  }}
                >
                  <Chip
                    label={userData.data.achievementsCount}
                    color="warning"
                    className="text-white text-2xl font-bold px-4 py-2"
                    icon={<WorkspacePremiumIcon />}
                  />
                  <p className="text-3xl font-bold text-tundora mt-4">
                    Достижений
                  </p>
                </Paper>
                <Paper
                  className="max-w-[450px] min-w-[450px] shadow-lg border border-alto"
                  elevation={4}
                  sx={{
                    padding: 3,
                    backgroundColor: '#fff3e0',
                  }}
                >
                  <Chip
                    label={userData.data.points}
                    className="bg-cinnabar text-white text-2xl font-bold px-4 py-2"
                    icon={<ElectricBoltIcon className="text-yellow" />}
                  />
                  <p className="text-3xl font-bold text-tundora mt-4">Баллов</p>
                </Paper>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center">
            <Typography
              variant="h3"
              className="text-center font-bold text-tundora"
            >
              Достижения
            </Typography>
            <div className="flex flex-col items-center gap-12">
              {userData.data.achievements?.map((achievement) => (
                <BadgeCard
                  key={achievement.id}
                  image={achievement.photo}
                  title={achievement.name}
                  description={achievement.description}
                  rarity={achievement.rarity.name}
                />
              ))}
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};
