import { useParams } from 'react-router-dom';
import { subjectQueries } from '~entities/subject';
import { Title } from '~shared/ui/title';
import { Journal } from '~widgets/journal';

export function GradePage() {
  const { courseId, groupId } = useParams(); 


  const { data: subjectData, isLoading, isError } = subjectQueries.useGetGrades(courseId, groupId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching grades.</div>;

  console.log(subjectData.data);
  
  return (
    <div>
      <Title>Оценки</Title>
      <Journal  /> 
    </div>
  );
}
