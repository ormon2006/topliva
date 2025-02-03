import { Title } from '~shared/ui/title';
import { Paper, Typography, Box, Grid, Divider } from '@mui/material';
import { userQueries } from '~entities/user';
import { subjectQueries } from '~entities/subject';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export function CoursePage() {
  const {
    data: userData,
    isLoading,
    isError,
  } = userQueries.useLoginUserQuery();

  const { id } = useParams();

  const {
    data: groupsData,
    isLoading: isGroupLoading,
    isError: isGroupError,
  } = subjectQueries.useGetGroups();

  if (isLoading && isGroupLoading) {
    return <div>Loading...</div>;
  }

  if (isError && isGroupError) {
    return <div>Error fetching user data.</div>;
  }

  if (isError || isGroupError || !userData || !groupsData) {
    return <div>Ошибка загрузки данных.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Title>Основы экономики, менеджмента и маркетинга в IT</Title>
      {userData.data.role !== 'student' ? (
        <>
          <h3 className="text-xl text-dove my-2 font-bold">Выберите группу:</h3>
          <div className="flex flex-wrap gap-2 mb-10">
            {groupsData.data &&
              groupsData.data.map((group, index) => (
                <Link
                  to={`/course/${id}/group/${group.id}`}
                  className="w-[200px] border rounded border-dove p-2 transition duration-100 hover:text-white hover:bg-blue cursor-pointer "
                  key={group.id}
                >
                  {group.name}
                </Link>
              ))}
          </div>
        </>
      ) : null}
      {userData.data.role === 'student' ? (
        <>
          <Paper
            elevation={3}
            sx={{ padding: 3, marginBottom: 3 }}
            className="shadow-none border border-alto rounded-lg mt-5"
          >
            <div className="flex justify-between gap-5">
              <div>
                <img
                  src="https://i.pinimg.com/736x/a8/ab/07/a8ab07e33c8e2630d92e71742cb97d98.jpg"
                  alt="Course Cover"
                  className="max-w-[200px] min-w-[200px] min-h-[200px] max-h-[200px] object-cover rounded-md"
                />
              </div>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6">
                  Основы экономики, менеджмента и маркетинга в IT
                </Typography>
                <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
                <Typography variant="body1">
                  Курс охватывает основные принципы экономики, управления и
                  маркетинга в IT. Вы научитесь оценивать финансовые показатели,
                  разрабатывать стратегии управления проектами и командами, а
                  также изучите методы маркетинга для IT-продуктов.
                </Typography>
              </Grid>
            </div>
          </Paper>
          <Paper className="shadow-none my-5">
            <Typography variant="h6">Теоретическая информация</Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="body1">
              Программа и материалы курса находятся в боксе "Product
              Managemant":
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <iframe
                src="https://makalabox.com"
                width="100%"
                height="600px"
                style={{ border: 'none', borderRadius: '8px' }}
                title="Makalabox Embed"
              ></iframe>
            </Box>
          </Paper>
        </>
      ) : null}
    </div>
  );
}
