import { Avatar, Chip, Paper, Tooltip, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
export const MentorProfile = ({ userData }) => {
  return (
    <div className="my-10 max-w-[340px]">
      <Paper
        elevation={3}
        sx={{ padding: 2 }}
        className="shadow-none border min-w-[340px] border-alto"
      >
        <div className="items-center">
          <div className="flex flex-col items-center">
            <Avatar
              alt="User Photo"
              src={userData.data.photo}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="body2" color="textSecondary" className="mt-2">
              @{userData.data.username}
            </Typography>
            <Typography variant="h6" className="text-center">
              {userData.data.firstName} {userData.data.lastName}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="mt-2 border w-full text-center p-1 rounded flex justify-center items-center "
            >
              <EmailIcon className="text-[16px] mr-1" />
              <p className="text-[14px]">{userData.data.email}</p>
            </Typography>
            <Typography variant="body2" color="textSecondary" className="mt-2">
              {userData.data.biography}
            </Typography>
          </div>
          <div>
            <h3 className="mt-5 font-bold text-dove text-center">Навыки:</h3>
            <div className="  flex flex-col ">
              {userData.data.skills.map((skill) => (
                <div className="flex items-center gap-1">
                  <CheckCircleIcon className="text-[green]/80 text-[18px]" />
                  <p className="font-medium text-sm">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5  flex flex-col ">
            <h3 className="font-bold text-dove text-center">Инструменты:</h3>
            <div className="flex mt-2">
              {userData.data.tools.map((tool) => (
                <Tooltip
                  title={tool.description}
                  className="cursor-pointer  border rounded-full px-3 py-1 shadow-sm flex items-center gap-2 "
                >
                  <img src={tool.logo} alt="" className="w-5" />
                  <p className="font-medium text-sm">{tool.name}</p>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};
