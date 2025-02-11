import { FC } from "react";
import { Button } from "@mui/material";
import { Profession } from "./model/types/salaryInfoTypes";
import som from "../../../public/tanda/SalaryInfo/som.png";

interface SalaryInfoCardProps {
  profession: Profession;
}

export const SalaryInfoCard: FC<SalaryInfoCardProps> = ({ profession }) => {
  return (
    <div className="text-[#4f4f4f] border border-[#ccc] relative rounded-[26px] p-[15px] bg-[#f9f9f9] shadow-md hover:transform hover:scale-105 transition-all duration-300 h-[360px] ">
      <div>
        <h3 className="text-2xl font-bold mb-4 font-[Roboto]">
          {profession.title}
        </h3>

        <div className="flex items-center gap-[5px] mb-[10px] font-[Roboto]">
          <img src={som} alt="Сом" className="w-8" />
          <div>
            <p className="text-[16px] font-bold">
              {profession.salaryBeginner.toLocaleString()} сом
            </p>
            <p className="text-[16px] font-medium ">Заработок новичка</p>
          </div>
        </div>

        <div className="flex items-center gap-[5px] mb-[10px] font-[Roboto]">
          <img src={som} alt="Сом" className="w-8" />
          <div>
            <p className="text-[16px] font-bold">
              {profession.salaryPro.toLocaleString()} сом
            </p>
            <p className="text-[16px] font-medium ">Заработок профессионала</p>
          </div>
        </div>

        <p className="text-[#7b7777] font-semibold text-[16px] mb-6 font-[Roboto]">
          {profession.description}
        </p>
      </div>
      <div className="absolute bottom-[30px] w-[250px]">
        <Button
          variant="contained"
          fullWidth
          sx={{
            background: "#005b50",
            width: "85%",
            position: "relative",
            bottom: "0",
            "&:hover": {
              backgroundColor: "#00796b",
              transform: "scale(1.05)",
              transition: "all 0.3s ease",
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
