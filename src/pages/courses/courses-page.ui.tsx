import { Title } from '~shared/ui/title';
import { CourseCard } from '~widgets/course-card';

const courses = [
  {
    title: 'Основы программирования',
    description: 'Научитесь базовым концепциям программирования.',
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
  return (
    <div>
      <Title>Мои курсы</Title>
      <div className="flex flex-col gap-5 mb-20">
        {courses.map((course) => (
          <CourseCard
            key={course.slug}
            title={course.title}
            description={course.description}
            image={course.image}
            slug={course.slug}
          />
        ))}
      </div>
    </div>
  );
}
