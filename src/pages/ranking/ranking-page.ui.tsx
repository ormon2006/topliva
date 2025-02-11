import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Title } from '~shared/ui/title';
import { StudentsRanking } from '~widgets/students-ranking';
import { GroupsRanking } from '~widgets/groups-ranking';

export function RankingPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 w-[500px]">
      <Title>Рейтинг и статистика</Title>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="По группам" />
          <Tab label="По студентам" />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        {activeTab === 0 && <GroupsRanking />}
        {activeTab === 1 && <StudentsRanking />}
      </Box>
    </div>
  );
}
