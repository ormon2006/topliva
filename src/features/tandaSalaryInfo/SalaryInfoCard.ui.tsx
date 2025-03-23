import { FC } from "react";
import { Button } from "@mui/material";
import { Profession } from "./model/types/salaryInfoTypes";
import som from "../../../public/tanda/SalaryInfo/som.png";

interface SalaryInfoCardProps {
  profession: Profession;
}

export const SalaryInfoCard: FC<SalaryInfoCardProps> = ({ profession }) => {
  return (
    <div className="text-[#4f4f4f] border border-[#ccc] relative rounded-[26px] p-4 bg-[#f9f9f9] shadow-md hover:transform hover:scale-105 transition-all duration-300 h-full min-h-[360px] flex flex-col justify-between">
      <div>
        <h3 className="text-xl md:text-2xl font-bold mb-3 font-[Roboto]">
          {profession.title}
        </h3>

        <div className="flex items-center gap-2 mb-3 font-[Roboto]">
          <img src={som} alt="Сом" className="w-6 md:w-8" />
          <div>
            <p className="text-sm md:text-base font-bold">
              {profession.salaryBeginner.toLocaleString()} сом
            </p>
            <p className="text-xs md:text-sm font-medium">Заработок новичка</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3 font-[Roboto]">
          <img src={som} alt="Сом" className="w-6 md:w-8" />
          <div>
            <p className="text-sm md:text-base font-bold">
              {profession.salaryPro.toLocaleString()} сом
            </p>
            <p className="text-xs md:text-sm font-medium">
              Заработок профессионала
            </p>
          </div>
        </div>

        <p className="text-[#7b7777] font-semibold text-sm md:text-base mb-4 font-[Roboto] line-clamp-4">
          {profession.description}
        </p>
      </div>

      <div className="w-full mt-auto">
        <Button
          variant="contained"
          fullWidth
          sx={{
            background: "#005b50",
            fontSize: { xs: "0.875rem", md: "1rem" },
            py: 1,
            "&:hover": {
              backgroundColor: "#00796b",
              transform: "scale(1.05)",
            },
          }}
          onClick={() => window.open(profession.link, "_blank")}
        >
          Читать далее
        </Button>
      </div>
    </div>
  );
};
