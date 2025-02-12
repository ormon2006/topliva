import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import { rankingQueries } from '~entities/ranking';

export function TvGroup() {
  const {
    data: groupsRanking,
    isLoading,
    isError,
  } = rankingQueries.useGetRankingByGroups();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
  }

  const groupRankings = groupsRanking.data
    .sort((a: { points: number }, b: { points: number }) => b.points - a.points)
    .map(
      (group: { id: number; name: string; points: number }, index: number) => ({
        rank: index + 1,
        group: group.name,
        points: group.points,
      })
    );

  const getRowBackground = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-sun';
      case 2:
        return 'bg-[#C0C0C0]';
      case 3:
        return 'bg-[#CE8946]';
      default:
        return 'bg-white';
    }
  };

  return (
    <TableContainer
      component={Paper}
      className="shadow-none border border-alto md:overflow-x-hidden md:max-w-full "
    >
      <Table size="large">
        <TableHead>
          <TableRow>
            <TableCell className="text-4xl p-6 font-bold">Место</TableCell>
            <TableCell className="text-4xl p-6 font-bold">Группа</TableCell>
            <TableCell align="right" className="text-xl p-6 font-bold">
              Баллы
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupRankings.map((group) => (
            <TableRow
              key={group.rank}
              className={`${getRowBackground(group.rank)}  py-5`}
            >
              <TableCell className="flex items-center space-x-2">
                <div className="backdrop-blur-xl bg-white/30 rounded-full text-[35px] font-bold p-2 flex items-center justify-center">
                  {group.rank <= 3 ? (
                    <img
                      src={`/trophy_${group.rank}.svg`}
                      className="w-17 h-[100px]"
                      alt=""
                    />
                  ) : (
                    group.rank
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Chip
                  label={group.group}
                  color="info"
                  className="text-4xl font-bold p-7"
                />
              </TableCell>
              <TableCell
                align="right"
                className="font-bold text-tundora text-4xl  px-10"
              >
                {group.points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

