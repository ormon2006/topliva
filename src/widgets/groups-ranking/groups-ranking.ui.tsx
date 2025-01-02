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

export function GroupsRanking() {
  const groupRankings = [
    { rank: 1, group: 'ПОВТ-1-20', points: 1200 },
    { rank: 2, group: 'ПОВТ-2-20', points: 1100 },
    { rank: 3, group: 'ПОВТ-4-20', points: 1000 },
    { rank: 4, group: 'АСОИ-1-20', points: 900 },
  ];


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
            className="shadow-none border border-alto  md:overflow-x-hidden md:max-w-full overflow-x-auto max-w-[350px]"
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Место</TableCell>
                  <TableCell>Группа</TableCell>
                  <TableCell align="right">Баллы</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupRankings.map((group) => (
                  <TableRow
                    key={group.rank}
                    className={`${getRowBackground(group.rank)}`}
                  >
                    <TableCell className="flex items-center space-x-1">
                      <div className="backdrop-blur-xl bg-white/30 rounded-full p-1 flex items-center justify-center">
                        {group.rank <= 3 ? (
                          <img
                            src={`/trophy_${group.rank}.svg`}
                            className="w-10 h-10"
                            alt=""
                          />
                        ) : (
                          group.rank
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip label={group.group} color="info" />
                    </TableCell>
                    <TableCell align="right" className='font-bold text-tundora'>{group.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
  );
}
