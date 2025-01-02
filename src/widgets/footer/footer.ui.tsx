import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import SchoolIcon from '@mui/icons-material/School';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import WidgetsIcon from '@mui/icons-material/Widgets';

export function Footer() {
  return (
    <Box component="footer" className="bg-tundora text-white py-6">
      <div className="container mx-auto px-4 pb-7 flex flex-col sm:flex-row items-center justify-around">
        <Link to={pathKeys.home()} className="flex items-center ">
          <SchoolIcon />
          <Typography variant="h6" component="div">
            BilimTrack
          </Typography>
        </Link>

        <div className="mt-4 sm:mt-0 flex space-x-6">
          <Link to="/about" className="text-gray-300 hover:text-white">
            О платформе
          </Link>
          <Link to="/privacy" className="text-gray-300 hover:text-white">
            Политика конфиденциальности
          </Link>
          <Link to="/terms" className="text-gray-300 hover:text-white">
            Условия использования
          </Link>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-4">
          <a target="_blank" href="https://t.me/maksat_kanybekov">
            <TelegramIcon />
          </a>
          <a target="_blank" href="https://www.instagram.com/maksat.up">
            <InstagramIcon />
          </a>
          <a target="_blank" href="http://makalabox.com/">
            <WidgetsIcon />
          </a>
        </div>
      </div>

      <Typography variant="body2" className="text-gray-400 text-center mt-4">
        &copy; {new Date().getFullYear()} OurEra Soft. Все права защищены.
      </Typography>
    </Box>
  );
}
