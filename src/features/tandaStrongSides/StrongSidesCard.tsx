// features/StrongSides/ui/StrongSidesCard/StrongSidesCard.tsx
import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useStrongSides } from "./model/lib/useStrongSides";
import { SkillScore, ProfessionData } from "./model/types/strongSidesTypes";
import star from "../../../public/tanda/StrongSides/icon-star.png";
import { skillToProfessions } from "./model/StrongSideData";
import { ResultChartProps } from "~features/tandaResults";

export const StrongSidesCard: FC<ResultChartProps> = ({ results }) => {
  const { topSkills } = useStrongSides(results);

  if (!results || topSkills.length === 0) {
    return <p className="text-center py-4">Результаты теста пока недоступны</p>;
  }

  return (
    <div className="text-black pt-6 px-4">
      <div className="container mx-auto">
        <div className="relative">
          {topSkills.map((item, index) => {
            const data: ProfessionData | undefined =
              skillToProfessions[item.skill] || {};

            return (
              <div
                key={index}
                className="flex w-full lg:flex-row gap-[10px] mb-10 rounded-[20px]"
              >
                <div
                  style={{ flex: "0 0 540px" }}
                  className={` py-12 px-[40px] w-full rounded-[20px] flex flex-col items-center   min-h-[468px] text-center ${data?.backgroundColor}`}
                >
                  <div className="flex items-center w-full justify-center gap-x-[8px] gap-1 bg-[#242424] min-w-[108px] px-5 py-[10px]  rounded-[32px] whitespace-nowrap">
                    <img src={star} alt="Star" className="w-9 h-9" />
                    <span className="text-TandaBg font-medium text-[18px] font-[Roboto]">
                      {item.score}% совпадение
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold mt-[15px] mb-[20px] font-[Roboto]">
                    {item.skill}
                  </h3>

                  {data.professions?.map((profession, idx) => (
                    <p
                      key={idx}
                      className="mb-5 font-medium text-[18px] font-[Roboto]"
                    >
                      Профессия: <strong>{profession}</strong>
                    </p>
                  ))}

                  {data?.image && (
                    <img
                      src={data.image}
                      alt={item.skill}
                      className="max-h-60 max-w-full m-0 "
                    />
                  )}
                </div>

                {/* Text Card */}
                <div className=" pt-[56px] pr-[56px] pb-[18px] pl-[56px] bg-white rounded-xl shadow-lg">
                  <h4 className="text-2xl font-semibold mb-2 font-[Roboto]">
                    Почему подходит
                  </h4>
                  <p className="text-lg mb-5 font-[Graphik,sans-serif]">
                    {data.reason}
                  </p>

                  <h4 className="text-2xl font-semibold mb-2 font-[Roboto]">
                    Суть профессии
                  </h4>
                  <ul className="  space-y-2">
                    {data?.professions?.map((_, idx) => (
                      <li
                        key={idx}
                        className="text-lg font-[Graphik,sans-serif]"
                      >
                        {data.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
