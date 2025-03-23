import { Outlet } from "react-router-dom";
import { HomeHeader } from "~widgets/tandaHeader";
import { useTestReset } from "~features/tandaReset";
export const TandaLayout = () => {
  const { isMobile, handleReset, isAuth } = useTestReset();

  return (
    <div className="bg-tandaTestBg">
      <div className=" flex flex-col max-w-[1168px] min-h-screen mx-auto  ">
        <HomeHeader isAuth={isAuth} isMobile={isMobile} onReset={handleReset} />
        <main className="flex-grow max-w-[1168px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );  
};
