import React from "react";
import { Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface TestResetButtonProps {
  isMobile: boolean;
  onReset: () => void;
  isAuth: boolean;
}

export const HomeHeader: React.FC<TestResetButtonProps> = ({
  isMobile,
  onReset,
  isAuth,
}) => {
  return (
    <div className="">
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-5 py-10 sm:px-5 sm:py-4">
          <h3
            className="text-[#005B50] text-3xl font-extrabold font-roboto 
            sm:text-[27px] xs:text-[24px] xxs:text-[22px]"
          >
            TANDA.COMTEHNO
          </h3>

          {isAuth && (
            <Button
              sx={{
                backgroundColor: "#005B50",
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#004D43",
                },
              }}
              variant="contained"
              onClick={onReset}
              title={isMobile ? "Пройти тест" : ""}
            >
              {isMobile ? <RestartAltIcon /> : "Пройти тест заново"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
