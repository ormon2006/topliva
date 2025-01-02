import { Avatar, Typography, Paper, Chip } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import GroupIcon from '@mui/icons-material/Group';

export function DashboardPage() {
  const user = {
    first_name: 'Максат',
    points: 1200,
    group_id: 'ПОВТ-1-20',
    achievements_count: 4,
    recent_activity: [
      'Получено достижение «Мастер домашек»',
      'Завершена домашняя работа №5',
    ],
  };

  return (
    <div className="my-10">
      <Paper
        elevation={3}
        sx={{ padding: 3 }}
        className="shadow-none border border-alto"
      >
        <Typography variant="h5" className="text-center font-bold">
          Добро пожаловать, {user.first_name}!
        </Typography>
        <div className="mt-5 flex flex-col items-center gap-4">
          <Paper
            className="max-w-[150px] min-w-[150px] shadow-none border border-alto"
            elevation={2}
            sx={{
              padding: 1,
              backgroundColor: '#e3f2fd',
            }}
          >
            <Chip
              label={user.group_id}
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
              backgroundColor: '#fff3e0',
            }}
          >
            <Chip
              label={`${user.points} баллов`}
              color="warning"
              className="text-white font-bold"
              icon={<ElectricBoltIcon />}
            />
            <p className="text-[15px] font-bold text-tundora">Баллы</p>
          </Paper>
          <Paper
            className="max-w-[150px] min-w-[150px] shadow-none border border-alto"
            elevation={2}
            sx={{
              padding: 1,
              backgroundColor: '#f1f8e9',
            }}
          >
            <Chip
              label={`${user.achievements_count} достижений`}
              color="success"
              className="text-white font-bold"
              icon={<WorkspacePremiumIcon />}
            />
            <p className="text-[15px] font-bold text-tundora">Достижения</p>
          </Paper>
        </div>
        <div className="mt-5">
          <Typography variant="h6" className="text-center">
            Последние активности
          </Typography>
          <ul className="list-disc pl-5">
            {user.recent_activity.map((activity, index) => (
              <li key={index} className="text-tundora">
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </Paper>
    </div>
  );
}
