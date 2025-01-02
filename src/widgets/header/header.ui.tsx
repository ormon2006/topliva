import { AppBar, Avatar, Toolbar, Tooltip, Typography } from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import { pathKeys } from '~shared/lib/react-router';

export function Header() {
  return (
    <AppBar position="static" className="bg-blue shadow font-medium">
      <Toolbar className="flex justify-between">
        <Link to={pathKeys.home()} className="flex items-center gap-2">
          <SchoolIcon />
          <Typography  className='font-semibold text-[20px]'>
            BilimTrack
          </Typography>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to={pathKeys.ranking()}
            className="text-white hover:text-gray-200"
          >
            Рейтинг
          </Link>
          <Link
            to={pathKeys.course.root()}
            className="text-white hover:text-gray-200"
          >
            Мои курсы
          </Link>
          <Link
            to={pathKeys.profile.badges()}
            className="text-white hover:text-gray-200"
          >
            Достижения
          </Link>
        </div>
        <div>
          <Tooltip title="Профиль">
          <Link to={pathKeys.profile.root()}>
            <Avatar
              src="https://api.makalabox.com/media/user_photos/profile4_5vTShTk.jpg"
            />
          </Link>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
}
