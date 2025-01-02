import { AppBar, Avatar, Toolbar, Tooltip, Typography } from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import { pathKeys } from '~shared/lib/react-router';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';

export function Header() {
  return (
    <AppBar position="static" className="bg-white shadow font-medium px-40">
      <Toolbar className="flex justify-between">
        <Link to={pathKeys.home()} className="flex items-center gap-1">
          <SchoolIcon className="text-tundora duration-500 hover:rotate-180" />
          <Typography className="font-semibold text-[20px] text-tundora">
            Bilim<span className="text-blue">Track</span>
          </Typography>
        </Link>
        <div className="flex gap-5">
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to={pathKeys.ranking()}
              className="text-dove hover:text-gray-200 font-semibold hover:text-blue flex items-center gap-1 border py-1 px-2 rounded-full text-[16px]"
            >
              <BarChartRoundedIcon/>
              Рейтинг
            </Link>
            <Link
              to={pathKeys.course.root()}
              className="text-dove hover:text-gray-200 font-semibold hover:text-blue flex items-center gap-1 border py-1 px-2 rounded-full text-[16px]"
            >
              <LibraryBooksRoundedIcon/>
              Мои курсы
            </Link>
            <Link
              to={pathKeys.profile.badges()}
              className="text-dove hover:text-gray-200 font-semibold hover:text-blue flex items-center gap-1 border py-1 px-2 rounded-full text-[16px]"
            >
              <EmojiEventsRoundedIcon/>
              Достижения
            </Link>
          </div>
          <Tooltip title="Профиль">
            <Link to={pathKeys.profile.root()}>
              <Avatar src="https://api.makalabox.com/media/user_photos/profile4_5vTShTk.jpg" />
            </Link>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
}
