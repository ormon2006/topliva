import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Title } from '~shared/ui/title';
import { StudentsRanking } from '~widgets/students-ranking';
import { GroupsRanking } from '~widgets/groups-ranking';
import { rankingQueries } from '~entities/ranking';
import { userQueries } from '~entities/user';
import { StudentProfile } from '~widgets/student-profile';

export function TvPage() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => (prevTab + 1) % 3);
    }, 180000); // 3 минуты (180000 мс)

    return () => clearInterval(interval);
  }, []);

  const {
    data: studentsRanking,
    isLoading: isRankingLoading,
    isError: isRankingError,
  } = rankingQueries.useGetRankingByStudents();

  const firstUsername = studentsRanking?.data?.[0]?.username;

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = userQueries.useGetUserByUsername(firstUsername ?? '');

  if (isRankingLoading || isUserLoading) {
    return <div>Loading...</div>;
  }

  if (isRankingError || isUserError || !firstUsername) {
    return <div>Error fetching data.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 w-[1200px] flex flex-col items-center">
      <Title>Рейтинг студентов первого курса</Title>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          centered
        >
          <Tab label="По группам" />
          <Tab label="По студентам" />
          <Tab label="Топ 1" />
        </Tabs>
      </Box>
      <Box sx={{ p: 3, width: '100%', display:"flex", justifyContent:"center" }}>
        {activeTab === 0 && <GroupsRanking />}
        {activeTab === 1 && <StudentsRanking />}
        {activeTab === 2 && <StudentProfile userData={userData} />}
      </Box>
    </div>
  );
}
