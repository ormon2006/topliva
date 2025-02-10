import { useState, useEffect, useRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';
import {
  useCreateGrades,
  useEditGrades,
} from '~entities/subject/subject.queries';
import debounce from 'lodash.debounce';

export function Journal({ usersData, subjectId }) {
  const [dates, setDates] = useState([]);
  const [users, setUsers] = useState([]);
  const [visibleRange, setVisibleRange] = useState([0, 4]);
  const [loadingCells, setLoadingCells] = useState({});
  const inputRefs = useRef({});
  const { mutate: createGrade } = useCreateGrades();
  const { mutate: editGrades } = useEditGrades();

  useEffect(() => {
    const allDates = new Set(usersData.flatMap((user) => user.scores.map((s) => s.date)));
    allDates.add(new Date().toISOString().split('T')[0]);
    setDates([...allDates].sort());

    setUsers(
      usersData.map((user) => ({
        id: user.user.id,
        fullName: `${user.user.fullName?.trim() || 'Неизвестно'} (${user.user.username})`,
        scores: user.scores.reduce((acc, score) => ({ ...acc, [score.date]: { id: score.id, grade: score.grade } }), {}),
      }))
    );
  }, [usersData]);

  const updateGrade = debounce((userId, date, grade, gradeId) => {
    setLoadingCells((prev) => ({ ...prev, [`${userId}-${date}`]: true }));
    const mutation = gradeId ? editGrades : createGrade;
    const payload = gradeId ? { id: gradeId, grade } : { grade, date, user: userId, subject: subjectId };

    mutation(payload, {
      onSuccess: (data) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? { ...user, scores: { ...user.scores, [date]: { id: data?.id || gradeId, grade } } }
              : user
          )
        );
        setLoadingCells((prev) => ({ ...prev, [`${userId}-${date}`]: false }));
      },
      onError: () => {
        setLoadingCells((prev) => ({ ...prev, [`${userId}-${date}`]: false }));
      },
    });
  }, 500);

  const handleChange = (userId, date, value) => {
    const grade = value === '' ? null : parseInt(value, 10);
    if (isNaN(grade) && value !== '') return;
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, scores: { ...user.scores, [date]: { id: user.scores[date]?.id, grade } } } : user
      )
    );
  };

  const handleBlur = (userId, date) => {
    const { id: gradeId, grade } = users.find((user) => user.id === userId)?.scores[date] || {};
    updateGrade(userId, date, grade, gradeId);
  };

  return (
    <div className="w-full mx-auto mt-4">
      <div className="flex justify-between mb-2">
        <Button variant="contained" onClick={() => setVisibleRange(([start, end]) => [start - 1, end - 1])} disabled={visibleRange[0] === 0}>Назад</Button>
        <Button variant="contained" onClick={() => setVisibleRange(([start, end]) => [start + 1, end + 1])} disabled={visibleRange[1] >= dates.length}>Вперед</Button>
      </div>
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell className="font-bold text-center sticky left-0 bg-gray-200 z-10" style={{ minWidth: '200px' }}>ФИО (Логин)</TableCell>
              {dates.slice(visibleRange[0], visibleRange[1]).map((date) => (
                <TableCell key={date} className="font-bold text-center">{date}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-100">
                <TableCell className="font-semibold sticky left-0 bg-white z-10" style={{ minWidth: '200px' }}>{user.fullName}</TableCell>
                {dates.slice(visibleRange[0], visibleRange[1]).map((date) => {
                  const cellKey = `${user.id}-${date}`;
                  return (
                    <TableCell key={date} className="text-center">
                      {loadingCells[cellKey] ? (
                        <CircularProgress size={20} />
                      ) : (
                        <TextField
                          variant="standard"
                          value={user.scores[date]?.grade ?? ''}
                          onChange={(e) => handleChange(user.id, date, e.target.value)}
                          onBlur={() => handleBlur(user.id, date)}
                          inputRef={(el) => (inputRefs.current[cellKey] = el)}
                          autoComplete="off"
                          inputProps={{ style: { textAlign: 'center', fontSize: '14px' } }}
                        />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
