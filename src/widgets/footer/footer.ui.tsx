import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";
import SchoolIcon from "@mui/icons-material/School";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import WidgetsIcon from "@mui/icons-material/Widgets";

export function Footer() {
  return (
    <Box component="footer" className="bg-primary text-white py-6 md:px-40 px-10">
      <div className="container mx-auto px-4 pb-7 flex flex-col sm:flex-row items-center justify-around">
        <Link to={pathKeys.about()} className="flex items-center mb-4 sm:mb-0">
          <Typography variant="h6" component="div" className="ml-2 text-center sm:text-left">
           FuelCalk
          </Typography>
        </Link>


        <div className="mt-4 sm:mt-0 flex space-x-4">
          <a target="_blank" href="https://t.me/maksat_kanybekov" className="text-gray-300 hover:text-white">
            <TelegramIcon />
          </a>
          <a target="_blank" href="https://www.instagram.com/maksat.up" className="text-gray-300 hover:text-white">
            <InstagramIcon />
          </a>
          <a target="_blank" href="http://makalabox.com/" className="text-gray-300 hover:text-white">
            <WidgetsIcon />
          </a>
        </div>
      </div>


    </Box>
  );
}
