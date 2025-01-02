import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
} from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import { Title } from '~shared/ui/title';
import { Link } from 'react-router-dom';
export function RankingPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const groupRankings = [
    { rank: 1, group: 'ПИМ-1-25', points: 1200 },
    { rank: 2, group: 'ПОВТ-3-24', points: 1100 },
    { rank: 3, group: 'ПОАС-2-24', points: 1000 },
    { rank: 4, group: 'ПИ-1-24', points: 900 },
  ];

  const rarityTranslations = {
    Эпическое: 'Epic',
    Легендарное: 'Legendary',
  };

  const studentRankings = [
    {
      rank: 1,
      name: 'Каныбеков Максат',
      points: 1500,
      avatar:
        'https://api.makalabox.com/media/user_photos/profile4_5vTShTk.jpg',
      username: 'maksat.up',
    },
    {
      rank: 2,
      name: 'Сартов Ахмед',
      points: 1500,
      avatar: 'https://via.placeholder.com/40',
      username: 'shen',
    },
    {
      rank: 3,
      name: 'Малабакиев Рамзан',
      points: 1300,
      avatar: 'https://via.placeholder.com/40',
      username: 'ramz1k',
    },
    {
      rank: 4,
      name: 'Исхакова Гульбахор',
      points: 1200,
      avatar: 'https://via.placeholder.com/40',
      username: 'gulnurs777',
    },
  ];

  const getMedalStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'font-bold';
      case 2:
        return 'font-bold';
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
    <div className="min-h-screen bg-gray-50 p-4">
      <Title>Рейтинг и статистика</Title>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="По группам" />
          <Tab label="По студентам" />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        {activeTab === 0 && (
          <TableContainer
            component={Paper}
            className="w-[400px] shadow-none border border-alto"
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
                            src={`/public/trophy_${group.rank}.svg`}
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
        )}
        {activeTab === 1 && (
          <TableContainer
            component={Paper}
            className="shadow-none border border-alto"
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Место</TableCell>
                  <TableCell>Студент</TableCell>
                  <TableCell align="right">Баллы</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentRankings.map((student) => (
                  <TableRow key={student.rank} style={{ height: '64px' }}>
                    <TableCell align="center" style={{ width: '50px' }}>
                      {student.rank <= 3 ? (
                        <div className="relative">
                          <img
                            src={`/public/medal_${student.rank}.svg`}
                            alt={`Медаль за ${student.rank} место`}
                            className="w-15 h-15 max-w-15 min-w-15 max-h-15 min-h-15"
                          />
                          <div
                            className={`w-[18px] h-[18px] text-tundora absolute top-[13%] left-[30%] text-[12px] rounded-full font-bold flex justify-center items-center ${getBackgroundColor(
                              student.rank
                            )}`}
                          >
                            {student.rank}
                          </div>
                        </div>
                      ) : (
                        <span
                          style={{
                            fontSize: '12px',
                            lineHeight: '64px',
                            fontWeight: 'bold',
                          }}
                        >
                          {student.rank}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {student.rank <= 3 ? (
                        <div
                          className="flex items-center space-x-2"
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Avatar src={student.avatar} alt={student.name} />
                          <div className="flex flex-col">
                            <span className={`${getMedalStyle(student.rank)}`}>
                              {student.name}
                            </span>
                            <Link
                              to="/"
                              className="font-semibold text-[13px] text-dove hover:underline hover:cursor-pointer"
                            >
                              @{student.username}
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="flex items-center space-x-2"
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Avatar src={student.avatar} alt={student.name} />
                          <div className="flex flex-col">
                            <span>{student.name}</span>
                            <Link
                              to="/"
                              className="font-semibold text-[13px] text-dove hover:underline hover:cursor-pointer"
                            >
                              @{student.username}
                            </Link>
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell align="right" className='font-bold text-tundora'>{student.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </div>
  );
}
