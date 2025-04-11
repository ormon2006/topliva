import { useEffect } from "react";
import { FormControlLabel, Radio, Typography } from "@mui/material";
import { Question as QuestionType } from "~entities/tandaQuestion";
import { ProgressBar } from "~shared/ui/progressBar";
import { Progress } from "~app/components/ui/progress";
import { Button } from "~app/components/ui/button";
import { Reveal } from "~shared/lib/framer";

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
  const progressValue = ((currentQuestionIndex + 1) / totalQuestion) * 100;
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
      <Reveal from="bottom" delay={0.3}>
        <div className="flex items-center gap-x-[30px] justify-center pb-[20px]">
          <span className="text-[#7b7b7b] font-semibold text-[15px]">
            {`${currentQuestionIndex + 1} из ${totalQuestion}`}
          </span>
          <Progress value={progressValue} className="h-2 w-[300px]" />
        </div>
      </Reveal>

      <div className="bg-white pt-[24px] pr-[48px] pb-[31px] pl-[63px] rounded-[30px] max-md:pr-[20px] max-md:pl-[43px]">
        <Reveal from="top" delay={0.3}>
          <h2 className="text-tandaColor text-[36px] font-medium font-['Roboto'] max-md:text-[28px] ">
            {question.question}
          </h2>
        </Reveal>

        <ul>
          {question.options.map((option) => (
            <Reveal key={option.value} from="left" delay={0.3}>
              {" "}
              <li
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
                        color: "#000",
                        "&.Mui-checked": {
                          color: "#000",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      className="text-tandaColor font-normal text-[1rem]"
                    >
                      {option.text}
                    </Typography>
                  }
                />
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal from="bottom" delay={0.3}>
          <div className="mt-[37px] flex items-center ">
            <Button
              onClick={onPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className=" rounded-[20px] px-[70px] py-[10px] m-auto text-white font-medium  text-[16px]   transition-colors duration-150 ease-in-out"
            >
              Назад
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};
