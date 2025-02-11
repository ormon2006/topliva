import { SkillScore, ProfessionData } from "../types/strongSidesTypes";
import { skillToProfessions } from "../StrongSideData";

export const useStrongSides = (results: Record<string, number>) => {
  if (!results || Object.keys(results).length === 0) {
    return { topSkills: [], recommendedProfessions: [] };
  }

  const totalScore = Object.values(results).reduce((acc, score) => acc + score, 0);
  
  const sortedSkills: SkillScore[] = Object.entries(results)
    .map(([skill, score]) => ({
      skill,
      score: Math.round((score / totalScore) * 100),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const recommendedProfessions: string[] = [];
  sortedSkills.forEach(({ skill }) => {
    const professions = skillToProfessions[skill]?.professions || [];
    professions.forEach(profession => {
      if (!recommendedProfessions.includes(profession)) {
        recommendedProfessions.push(profession);
      }
    });
  });

  return { topSkills: sortedSkills, recommendedProfessions };
};