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
} from '@mui/material';
import { useCreateGrades } from '~entities/subject/subject.queries';

export function Journal({ usersData, subjectId }): JSX.Element {
  const [dates, setDates] = useState<string[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [visibleRange, setVisibleRange] = useState([0, 4]);
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [sentGrades, setSentGrades] = useState<{ [key: string]: boolean }>({});

  const { mutate: createGrade } = useCreateGrades();

  useEffect(() => {
    const allDates = new Set<string>();
    usersData.forEach((user) =>
      user.scores.forEach((score) => allDates.add(score.date))
    );

    const today = new Date().toISOString().split('T')[0];
    allDates.add(today);

    const sortedDates = Array.from(allDates).sort();
    setDates(sortedDates);

    const transformed = usersData.map((entry) => {
      const scoresMap = entry.scores.reduce(
        (acc, score) => ({ ...acc, [score.date]: score.grade }),
        {}
      );

      return {
        id: entry.user.id,
        fullName: `${entry.user.fullName?.trim() || 'Неизвестно'} (${
          entry.user.username
        })`,
        scores: scoresMap,
      };
    });

    setUsers(transformed);
  }, [usersData]);

  const handleNext = () => {
    if (visibleRange[1] < dates.length) {
      setVisibleRange([visibleRange[0] + 1, visibleRange[1] + 1]);
    }
  };

  const handlePrev = () => {
    if (visibleRange[0] > 0) {
      setVisibleRange([visibleRange[0] - 1, visibleRange[1] - 1]);
    }
  };

  const handleChange = (index: number, date: string, value: string) => {
    setUsers((prevUsers) => {
      const newUsers = [...prevUsers];
      const newValue = value === '' ? '' : parseInt(value, 10);
      if (!isNaN(newValue) || value === '') {
        newUsers[index].scores[date] = newValue;
      }
      return newUsers;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    let newRow = row;
    let newCol = col;

    switch (e.key) {
      case 'ArrowRight':
        newCol = Math.min(
          col + 1,
          dates.slice(visibleRange[0], visibleRange[1]).length - 1
        );
        break;
      case 'ArrowLeft':
        newCol = Math.max(col - 1, 0);
        break;
      case 'ArrowDown':
        newRow = Math.min(row + 1, users.length - 1);
        break;
      case 'ArrowUp':
        newRow = Math.max(row - 1, 0);
        break;
      case 'Enter':
      case 'Tab':
        newCol++;
        if (newCol >= dates.slice(visibleRange[0], visibleRange[1]).length) {
          newCol = 0;
          newRow++;
          if (newRow >= users.length) newRow = 0;
        }
        break;
      default:
        return;
    }

    e.preventDefault();
    setSelectedCell({ row: newRow, col: newCol });

    const nextCellKey = `${newRow}-${dates[visibleRange[0] + newCol]}`;
    setTimeout(() => {
      inputRefs.current[nextCellKey]?.focus();
      inputRefs.current[nextCellKey]?.select();
    }, 10);
  };

  return (
    <div className="w-full mx-auto mt-4">
      <div className="flex justify-between mb-2">
        <Button
          variant="contained"
          onClick={handlePrev}
          disabled={visibleRange[0] === 0}
        >
          Назад
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={visibleRange[1] >= dates.length}
        >
          Вперед
        </Button>
      </div>
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell
                className="font-bold text-center sticky left-0 bg-gray-200 z-10"
                style={{ minWidth: '200px' }}
              >
                ФИО (Логин)
              </TableCell>
              {dates.slice(visibleRange[0], visibleRange[1]).map((date) => (
                <TableCell key={date} className="font-bold text-center">
                  {date}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-gray-100">
                <TableCell
                  className="font-semibold sticky left-0 bg-white z-10"
                  style={{ minWidth: '200px' }}
                >
                  {user.fullName}
                </TableCell>
                {dates
                  .slice(visibleRange[0], visibleRange[1])
                  .map((date, colIndex) => {
                    const cellKey = `${rowIndex}-${date}`;
                    return (
                      <TableCell key={date} className="text-center">
                        <TextField
                          variant="standard"
                          value={user.scores[date] ?? ''}
                          onChange={(e) =>
                            handleChange(rowIndex, date, e.target.value)
                          }
                          onBlur={() => {
                            const cellKey = `${rowIndex}-${date}`;
                            const gradeValue = user.scores[date];
                            if (gradeValue !== '' && !sentGrades[cellKey]) {
                              createGrade({
                                grade: gradeValue,
                                date,
                                user: user.id,
                                subject: subjectId,
                              });
                              setSentGrades((prev) => ({
                                ...prev,
                                [cellKey]: true,
                              }));
                            }
                          }}
                          inputRef={(el) => (inputRefs.current[cellKey] = el)}
                          onKeyDown={(e) =>
                            handleKeyDown(e, rowIndex, colIndex)
                          }
                          autoComplete="off"
                          inputProps={{
                            style: { textAlign: 'center', fontSize: '14px' },
                          }}
                        />
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
