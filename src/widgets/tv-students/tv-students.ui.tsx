import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  TextField,
  Pagination,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { rankingQueries } from '~entities/ranking';

export function TvStudents({ isTopThree }: { isTopThree?: boolean }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(30);
  const [searchQuery, setSearchQuery] = useState('');

  const transformStudentData = (data: any[]) => {
    return data.map((student, index) => ({
      rank: index + 1,
      name: `${student.lastName} ${student.firstName}`,
      points: student.points,
      photo: student.photo || 'https://via.placeholder.com/40',
      username: student.username,
    }));
  };

  const {
    data: studentsRanking,
    isLoading,
    isError,
  } = rankingQueries.useGetRankingByStudents();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
  }
  const studentRankings = transformStudentData(studentsRanking.data);

  const filteredStudents = studentRankings.filter((student) =>
    student.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedStudents = isTopThree
    ? filteredStudents.slice(0, 3)
    : filteredStudents.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

  const getMedalStyle = (rank: number) => {
    switch (rank) {
      case 1:
      case 2:
      case 3:
        return 'font-bold';
      default:
        return 'text-gray';
    }
  };

  const getBackgroundColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-[#EFBF04]';
      case 2:
        return 'bg-[#C0C0C0]';
      case 3:
        return 'bg-[#CE8946]';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <TableContainer
        component={Paper}
        className="shadow-none w-[1500px] border border-alto md:overflow-x-hidden md:max-w-full"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="text-4xl p-16 font-bold">Место</TableCell>
              <TableCell className="text-4xl p-16 font-bold">Студент</TableCell>
              <TableCell align="right" className="text-4xl p-16 font-bold">
                Баллы
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedStudents.map((student) => (
              <TableRow key={student.rank} style={{ height: '256px' }}>
                <TableCell
                  align="center"
                  style={{ width: '100px', height: '100px' }}
                >
                  {student.rank <= 3 ? (
                    <div className="relative flex justify-center items-center w-40 h-40">
                      <img
                        src={`/medal_${student.rank}.svg`}
                        alt={`Медаль за ${student.rank} место`}
                        className="w-40 h-40"
                      />
                      <div
                        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] text-white text-3xl font-bold rounded-full flex justify-center items-center ${getBackgroundColor(
                          student.rank
                        )}`}
                      >
                        {student.rank}
                      </div>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold flex justify-center items-center h-full">
                      {student.rank}
                    </span>
                  )}
                </TableCell>

                <TableCell>
                  <div
                    className="flex items-center space-x-2"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Avatar
                      src={`https://api.bilim-track.makalabox.com/${student.photo}`}
                      alt={student.name}
                      sx={{ width: 120, height: 120 }}
                    />

                    <div className="flex flex-col">
                      <p
                        className={`${getMedalStyle(student.rank)} text-[45px]`}
                      >
                        {student.name}
                      </p>
                      <Link
                        to={`/${student.username}`}
                        className="font-semibold text-[35px] text-dove hover:underline hover:cursor-pointer"
                      >
                        @{student.username}
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  align="right"
                  className="font-bold text-tundora text-[40px] px-[100px]"
                >
                  {student.points}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!isTopThree && (
        <Pagination
          count={10}
          page={page + 1}
          onChange={(event, value) => setPage(value - 1)}
          color="primary"
          className="flex justify-center w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] mx-auto"
          size="medium"
          siblingCount={1}
          boundaryCount={1}
          showFirstButton
          showLastButton
        />
      )}
    </div>
  );
}
