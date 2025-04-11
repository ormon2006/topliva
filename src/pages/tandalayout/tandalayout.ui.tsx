import { Outlet } from "react-router-dom";
import { HomeHeader } from "~widgets/tandaHeader";
import { useTestReset } from "~features/tandaReset";
import "~app/index.css";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export const TandaLayout = () => {
  const { isMobile, handleReset, isAuth } = useTestReset();

  return (
    <ThemeProvider theme={theme} >
      <div className="bg-[#F0F0F0]">
        <div className=" flex flex-col max-w-[1168px] min-h-screen mx-auto  ">
          <HomeHeader
            isAuth={isAuth}
            isMobile={isMobile}
            onReset={handleReset}
          />
          <main className="flex-grow max-w-[1168px] mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};
