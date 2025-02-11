import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeImg from "../../../public/tanda/HeaderImg.svg";
import questionImg from "../../../public/tanda/question.png";
import timeImg from "../../../public/tanda/time.png";
export const HomeContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center pt-[0] pr-5 pb-5 pl-5 ">
      <img src={HomeImg} alt="Header" className="m-auto" />
      <Typography className="text-[52px] font-bold font-[Graphik,sans-serif]  mt-6 max-md:text-[32px] max-sm:text-[26px]">
        Узнайте, какая профессия <br /> вам подходит
      </Typography>
      <Typography className="leading-[24px] text-[20px] font-[Graphik,sans-serif] font-semibold text-[#666666] mt-5 max-sm:text-base">
        Получите подробный отчёт от профориентологов <br /> и найдите дело по
        душе
      </Typography>

      <div className="flex justify-center items-center gap-[30px] flex-wrap mt-6">
        <div className="flex items-center bg-[#ebebeb] rounded-full px-4 py-2 text-[16px] font-medium font-[Graphik,sans-serif]">
          <img src={questionImg} alt="questions" className="w-8 h-8 mr-2" />
          14 вопросов
        </div>
        <div className="flex items-center bg-[#ebebeb] rounded-full px-4 py-2 text-[16px] font-medium font-[Graphik,sans-serif]">
          <img src={timeImg} alt="time" className="w-8 h-8 mr-2" />
          ~2 минуты
        </div>
      </div>

      <Button
        className="normal-case"
        onClick={() => navigate("/tanda/test")}
        variant="contained"
        sx={{
          background: "#005B50",
          "@media (max-width: 360px)": {
            width: "200px",
            margin: "15px",
          },
        }}
        style={{
          borderRadius: "20px",
          fontSize: "16px",
          padding: "15px 80px",
          margin: "30px",
          maxWidth: "100%",
        }}
      >
        Пройти тест
      </Button>
    </div>
  );
};
