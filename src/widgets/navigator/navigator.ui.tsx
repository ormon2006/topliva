import { useState } from 'react';
import { Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SchoolIcon from '@mui/icons-material/School';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { pathKeys } from '~shared/lib/react-router';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export function Navigator() {
  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  const handleNavigation = (newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate(pathKeys.home());
        break;
      case 1:
        navigate(pathKeys.course.root());
        break;
      case 2:
        navigate(pathKeys.ranking());
        break;
      case 3:
        navigate(pathKeys.profile.badges());
        break;
      case 4:
        navigate(pathKeys.profile.root());
        break;
      default:
        break;
    }
  };
  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}}
      elevation={5}
      className="shadow-none md:hidden"
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          handleNavigation(newValue);
        }}

      >
        <BottomNavigationAction    label="" icon={<HomeRoundedIcon />} />
        <BottomNavigationAction label="" icon={<SchoolIcon />} />
        <BottomNavigationAction  
          label=""
          icon={<BarChartRoundedIcon />}
        />
        <BottomNavigationAction   label="" icon={<EmojiEventsIcon />} />

        <BottomNavigationAction  className='min-w-[0] px-0 max-w-[55px]'  label="" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
