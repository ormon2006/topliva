import { Typography, Paper, LinearProgress, Box } from '@mui/material';
import { articleQueries } from '~entities/makalabox';
import { ArticleCard } from '~entities/makalabox/ui/ArticleCard';
import { userQueries } from '~entities/user';
import { BadgeList } from '~widgets/badge-list';
import { GoalList } from '~widgets/goal-list';
import { MakalaList } from '~widgets/makala-list';
import { StudentsRanking } from '~widgets/students-ranking';

const usersData = {
  weekly_leaders: [
    { name: 'Айдар', points: 1500 },
    { name: 'Камила', points: 1400 },
    { name: 'Максат', points: 1200 },
  ],
};

export function DashboardPage() {
  const {
    data: userData,
    isLoading,
    isError,
  } = userQueries.useLoginUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
  }

  return (
    <div className="my-10 flex flex-col gap-6">
      <Paper elevation={3} className="p-5 shadow-none border border-alto">
        <Typography variant="h5" className="font-bold">
          Добро пожаловать, {userData.data.firstName}!
        </Typography>
        <Typography variant="body1">
          Группа: {userData.data.group} • Баллы: {userData.data.points}
        </Typography>
      </Paper>
      <Paper elevation={3} className="p-5 shadow-none border border-alto">
        <Typography variant="h6" className="font-bold mb-3">
          Лидеры недели
        </Typography>
        <StudentsRanking />
      </Paper>
      <BadgeList achievements={userData.data.achievements} />
      <GoalList />
      <MakalaList />
    </div>
  );
}
