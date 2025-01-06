import { Typography, Paper, LinearProgress, Box } from '@mui/material';
import { articleQueries } from '~entities/makalabox';
import { ArticleCard } from '~entities/makalabox/ui/ArticleCard';
import { userQueries } from '~entities/user';
import { StudentsRanking } from '~widgets/students-ranking';

const usersData = {
  weekly_leaders: [
    { name: 'Айдар', points: 1500 },
    { name: 'Камила', points: 1400 },
    { name: 'Максат', points: 1200 },
  ],
  goals: [
    { id: 1, title: 'Завершить 10 домашних заданий', progress: 60 },
    { id: 2, title: 'Достигнуть 6 уровня', progress: 50 },
  ],
};

export function DashboardPage() {
  const {
    data: userData,
    isLoading,
    isError,
  } = userQueries.useLoginUserQuery();
  const {
    data: articles, isSuccess
  } = articleQueries.useGetArticles()

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
  }

  const latestArticles = articles?.data.results.slice(0, 3);

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
      <Paper elevation={3} className="p-5 shadow-none border border-alto">
        <Typography variant="h6" className="font-bold mb-3">
          Последние достижения
        </Typography>
        <div className="flex gap-4">
          {userData.data.achievements.map((ach) => (
            <div key={ach.id} className="flex flex-col items-center">
              <img src={ach.photo} alt={ach.name} className="w-16 h-16" />
              <Typography variant="body2" className="text-center">
                {ach.name}
              </Typography>
            </div>
          ))}
        </div>
      </Paper>
      <Paper
        elevation={3}
        className="relative p-5 shadow-none border border-alto rounded-md"
      >
        <Box className="absolute inset-0 bg-black/70 flex items-center justify-center z-10 rounded-md">
          <Typography variant="h6" className="text-white font-bold text-center">
            Скоро <br />
            (В разработке)
          </Typography>
        </Box>
        <Typography variant="h6" className="font-bold mb-3">
          Прогресс целей
        </Typography>
        {usersData.goals.map((goal) => (
          <div key={goal.id} className="mb-4">
            <Typography variant="body2">{goal.title}</Typography>
            <LinearProgress variant="determinate" value={goal.progress} />
            <Typography variant="caption">{goal.progress}%</Typography>
          </div>
        ))}
      </Paper>
      <Paper
        elevation={3}
        className=" p-5 shadow-none border border-alto rounded-md flex flex-col items-center gap-5"
      >
        <Typography variant="h6" className="font-bold ">
          Статьи на Makalabox
        </Typography>
        {isSuccess && latestArticles.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </Paper>

    </div>
  );
}
