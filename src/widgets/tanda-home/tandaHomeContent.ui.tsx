import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeImg from "../../../public/tanda/HeaderImg.svg";
import questionImg from "../../../public/tanda/question.png";
import timeImg from "../../../public/tanda/time.png";
import { Button } from "~app/components/ui/button";
import { Reveal } from "~shared/lib/framer";
export const HomeContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center pt-[0] pr-5 pb-5 pl-5 ">
      <Reveal from="top" delay={0.3}>
        <img src={HomeImg} alt="Header" className="m-auto" />
      </Reveal>
      <Reveal from="bottom" delay={0.3}>
        <Typography className="text-[52px] text-[#2C2C2C] font-bold н mt-6 max-md:text-[32px] max-sm:text-[26px]">
          Узнайте, какая профессия <br /> вам подходит
        </Typography>

        <Typography className="leading-[24px] text-[20px] font-semibold text-[#888888] mt-5 max-sm:text-base">
          Получите подробный отчёт от профориентологов <br /> и найдите дело по
          душе
        </Typography>
      </Reveal>

      <div className="flex justify-center items-center gap-[30px] flex-wrap mt-6">
        <Reveal from="left" delay={0.3}>
          <div className="flex items-center bg-[#E0E0E0] text-[#2C2C2C] rounded-full px-4 py-2 text-[16px] font-medium font-[Graphik,sans-serif]">
            <img src={questionImg} alt="questions" className="w-8 h-8 mr-2" />
            14 вопросов
          </div>
        </Reveal>
        <Reveal from="right" delay={0.3}>
          <div className="flex items-center bg-[#E0E0E0] text-[#2C2C2C] rounded-full px-4 py-2 text-[16px] font-medium font-[Graphik,sans-serif]">
            <img src={timeImg} alt="time" className="w-8 h-8 mr-2" />
            ~2 минуты
          </div>
        </Reveal>
      </div>
      <Reveal from="bottom" delay={0.3}>
        <Button
          onClick={() => navigate("/tanda/test")}
          style={{
            borderRadius: "20px",
            fontSize: "16px",
            padding: "20px 80px",
            margin: "30px",
            maxWidth: "100%",
          }}
        >
          Пройти тест
        </Button>
      </Reveal>
    </div>
  );
};
