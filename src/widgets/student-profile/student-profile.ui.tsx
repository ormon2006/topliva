import { Avatar, Chip, Paper, Typography } from '@mui/material';
import { Chart } from '~widgets/chart';
import { BadgeCard } from '~widgets/badge-card';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';

export const StudentProfile = ({ userData }) => {
  return (
    <div className="my-10  max-w-[340px]">
      <Paper
        elevation={3}
        sx={{ padding: 2 }}
        className="shadow-none border min-w-[340px] border-alto"
      >
        <div className="items-center">
          <div className="flex flex-col items-center">
            <Avatar
              alt="User Photo"
              src={userData.data.photo}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="body2" color="textSecondary" className="mt-2">
              @{userData.data.username}
            </Typography>
            <Typography variant="h6" className="text-center">
              {userData.data.firstName} {userData.data.lastName}
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
                    label={userData.data.group}
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
                    label={userData.data.rating}
                    color="success"
                    className="text-white font-bold"
                    icon={<EmojiEventsIcon className="text-sun" />}
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
                    label={userData.data.achievementsCount}
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
                    label={userData.data.points}
                    className="bg-cinnabar text-white font-bold"
                    icon={<ElectricBoltIcon className="text-yellow" />}
                  />
                  <p className="text-[15px] font-bold text-tundora">Баллов</p>
                </Paper>
              </div>
            </div>
          </div>

          <div className="mt-5  flex flex-col items-center"></div>
          <div className="mt-5 flex flex-col items-center">
            <Typography
              variant="h6"
              className="text-center font-semibold text-tundora"
            >
              Достижения
            </Typography>
            <div className="flex flex-col items-center gap-5">
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
