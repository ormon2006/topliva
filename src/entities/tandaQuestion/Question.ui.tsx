import { useEffect } from "react";
import { FormControlLabel, Radio, Button, Typography } from "@mui/material";
import { Question as QuestionType } from "~entities/tandaQuestion";
import { ProgressBar } from "~shared/ui/progressBar";

interface QuestionProps {
  question: QuestionType;
  selectedOption: string;
  onOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  currentQuestionIndex: number;
  totalQuestion: number;
}

export const QuestionCard: React.FC<QuestionProps> = ({
  question,
  selectedOption,
  onOptionChange,
  onNextQuestion,
  onPreviousQuestion,
  currentQuestionIndex,
  totalQuestion,
}) => {
  useEffect(() => {
    if (selectedOption) {
      const timer = setTimeout(() => {
        onNextQuestion();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedOption, onNextQuestion]);
  const handleOptionClick = (optionValue: string) => {
    const event = {
      target: { value: optionValue },
    } as React.ChangeEvent<HTMLInputElement>;
    onOptionChange(event);
  };

  return (
    <div className="max-w-[968px]  pt-[30px] px-[20px]   min-h-[100vh]  ">
      <div className="flex items-center gap-x-[30px] justify-center pb-[20px] ">
        <Typography
          variant="body2"
          className="text-[#7b7b7b]  font-['Roboto'] font-semibold text-[15px] pb-[10px]"
        >{`${currentQuestionIndex + 1} из ${totalQuestion}`}</Typography>
        <ProgressBar progress={(currentQuestionIndex + 1) / totalQuestion} />
      </div>
      <div className="bg-white pt-[24px] pr-[48px] pb-[31px] pl-[63px] rounded-[30px] max-md:pr-[20px] max-md:pl-[43px]">
        <h2 className="text-tandaColor text-[36px] font-medium font-['Roboto'] max-md:text-[32px] ">
          {question.question}
        </h2>
        <ul>
          {question.options.map((option) => (
            <li
              key={option.value}
              className="max-w-[870px] mt-5 rounded-[16px] py-5 pl-7 bg-tandaTestBg hover:bg-[#ebebeb] transition-colors duration-150 ease-in-out md:py-4 md:pl-5 cursor-pointer"
              onClick={() => handleOptionClick(option.value)}
            >
              <FormControlLabel
                control={
                  <Radio
                    checked={selectedOption === option.value}
                    onChange={onOptionChange}
                    value={option.value}
                    sx={{
                      color: "#005b50",
                      "&.Mui-checked": {
                        color: "#005b50",
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    className="font-[Roboto] text-tandaColor font-normal text-[1rem]"
                  >
                    {option.text}
                  </Typography>
                }
              />
            </li>
          ))}
        </ul>

        <div className="mt-[37px] flex items-center ">
          <Button
            onClick={onPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="contained"
            className=" m-auto text-white font-medium font-[Roboto] text-[16px]  hover:bg-[#004842] transition-colors duration-150 ease-in-out"
            sx={{
              background: "#005b50",
              borderRadius: "20px",
              padding: "10px 70px",
            }}
          >
            Назад
          </Button>
        </div>
      </div>
    </div>
  );
};
