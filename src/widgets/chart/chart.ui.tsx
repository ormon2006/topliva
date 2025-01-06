import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface ChartDataPoint {
  date: string;
  score: number;
}

const chartData: ChartDataPoint[] = [
  { date: '01-01', score: 7 },
  { date: '01-15', score: 8 },
  { date: '02-01', score: 9 },
  { date: '02-15', score: 6 },
  { date: '03-01', score: 10 },
  { date: '01-01', score: 7 },
];

const options: ApexCharts.ApexOptions = {
  chart: {
    type: 'line',
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  dataLabels: { enabled: true },
  stroke: { curve: 'smooth' },
  xaxis: {
    categories: chartData.map((data) => data.date),
    title: { text: 'Даты' },
  },
  yaxis: {
    max: 10,
    min: 0,
    tickAmount: 5,
    title: { text: 'Баллы' },
  },
  colors: ['#0589c7'],
  tooltip: { shared: true },
};

const series = [
  {
    name: 'Score',
    data: chartData.map((data) => data.score),
  },
];

export const Chart: React.FC = () => {
  return (
    <Card className="max-w-[320px] min-w-[320px] shadow-none rounded-lg border border-alto">
      <Typography variant="h6" className="font-bold mb-3 px-4 pt-4">
        График успеваемости
      </Typography>
      <CardContent className="p-0">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </CardContent>
    </Card>
  );
};
