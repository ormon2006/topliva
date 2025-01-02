import {
  Avatar,
  Typography,
  Paper,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Chart } from '~widgets/chart';
import { StudentsRanking } from '~widgets/students-ranking';

const userData = {
  first_name: 'Максат',
  points: 1200,
  group_id: 'ПОВТ-1-20',
  achievements: [
    { id: 1, title: 'Мастер домашек', image: '/bade_1.svg' },
    { id: 3, title: 'Командный игрок', image: '/team.svg' },
    { id: 5, title: 'Наставник', image: '/mentor.svg' },
  ],
  weekly_leaders: [
    { name: 'Айдар', points: 1500 },
    { name: 'Камила', points: 1400 },
    { name: 'Максат', points: 1200 },
  ],
  quests: [
    { id: 1, title: 'Завершите 3 задания', completed: false },
    { id: 2, title: 'Получите 2 новых достижения', completed: false },
  ],
  goals: [
    { id: 1, title: 'Завершить 10 домашних заданий', progress: 60 },
    { id: 2, title: 'Достигнуть 6 уровня', progress: 50 },
  ],
};

export function DashboardPage() {
  return (
    <div className="my-10 flex flex-col gap-6">
      <Paper elevation={3} className="p-5 shadow-none border border-alto">
        <Typography variant="h5" className="font-bold">
          Добро пожаловать, {userData.first_name}!
        </Typography>
        <Typography variant="body1">
          Группа: {userData.group_id} • Баллы: {userData.points}
        </Typography>
      </Paper>

      <Chart />

      <Paper elevation={3} className="p-5 shadow-none border border-alto">
        <Typography variant="h6" className="font-bold mb-3">
          Лидеры недели
        </Typography>
        <StudentsRanking/>
      </Paper>

      <Paper elevation={3} className="p-5 shadow-none border border-alto">
        <Typography variant="h6" className="font-bold mb-3">
          Последние достижения
        </Typography>
        <div className="flex gap-4">
          {userData.achievements.map((ach) => (
            <div key={ach.id} className="flex flex-col items-center">
              <img src={ach.image} alt={ach.title} className="w-16 h-16" />
              <Typography variant="body2" className="text-center">
                {ach.title}
              </Typography>
            </div>
          ))}
        </div>
      </Paper>

      <Paper elevation={3} className="p-5 shadow-none border border-alto">
        <Typography variant="h6" className="font-bold mb-3">
          Прогресс целей 
        </Typography>
        {userData.goals.map((goal) => (
          <div key={goal.id} className="mb-4">
            <Typography variant="body2">{goal.title}</Typography>
            <LinearProgress variant="determinate" value={goal.progress} />
            <Typography variant="caption">{goal.progress}%</Typography>
          </div>
        ))}
      </Paper>
    </div>
  );
}
