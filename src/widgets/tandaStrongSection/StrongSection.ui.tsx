import React from "react";
import { StrongSidesCard } from "~features/tandaStrongSides";
import { ResultChartProps } from "~features/tandaResults";
import { Typography } from "@mui/material";
export const StrongSection: React.FC<ResultChartProps> = ({ results }) => {
  return (
    <div>
      <div className="relative ">
        <Typography
          variant="h2"
          className="my-[20px] text-[2.2rem] font-semibold font-[Roboto] text-center"
        >
          Подходящие профессии
        </Typography>
        <StrongSidesCard results={results} />
      </div>
    </div>
  );
};
