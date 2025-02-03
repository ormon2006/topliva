import { subjectQueries } from '~entities/subject';
import { Title } from '~shared/ui/title';
import { CourseCard } from '~widgets/course-card';

const courses = [
  {
    title: 'Основы Product Managemant.',
    description: 'Научитесь базовым концепциям Product Managemant',
    image: 'https://i.pinimg.com/736x/29/60/14/29601413f2151b635b20b95da4285f61.jpg',
    slug: 'intro-to-programming',
  },
  {
    title: 'Веб-разработка',
    description: 'Создавайте современные веб-сайты.',
    image: 'https://i.pinimg.com/736x/cb/5d/bd/cb5dbd8bcd4e7ac91e5ed3a43b04f1eb.jpg',
    slug: 'web-development',
  },
];

export function CoursesPage() {
  const {data:coursesData, isLoading, isError} = subjectQueries.useGetSubjects()

  if(isLoading){
    return <div>Loading</div>
  }
  
  if(isError){
    return <div>Ошибка загрузки</div>
  }
  
  return (
    <div className='w-[90%] mx-auto'>
      <Title>Мои курсы</Title>
      <div className="flex flex-col gap-5 mb-20 mx-auto">
        {coursesData?.data?.map((course) => (
          <CourseCard
            key={course.slug}
            title={course.name}
            description={course.description}
            image={course.photo}
            id={course.id}
          />
        ))}
      </div>
    </div>
  );
}
