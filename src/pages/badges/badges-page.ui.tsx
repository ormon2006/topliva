import { Title } from '~shared/ui/title';
import { BadgeCard } from '~widgets/badge-card';

const badges = [
  {
    id: 1,
    image: '/bade_1.svg',
    title: 'Мастер домашек',
    description: 'Не пропускайте 5 домашек подряд.',
    rarity: 'Эпическое',
  },
  {
    id: 3,
    image: '/team.svg',
    title: 'Командный игрок',
    description: 'Примите участие в 10 командных проектах.',
    rarity: 'Легендарное',
  },
  {
    id: 5,
    image: '/mentor.svg',
    title: 'Наставник',
    description: 'Помогите 10 коллегам в их проектах.',
    rarity: 'Легендарное',
  },
  {
    id: 7,
    image: '/success.svg',
    title: 'Перфекционист',
    description: 'Получите 100% результат в 5 проектах.',
    rarity: 'Эпическое',
  },
];

export function BadgesPage() {
  return (
    <>
    <Title>Мои достижения</Title>
    <div className='flex flex-wrap gap-10 my-5'>
      {badges.map((achievement) => (
        <BadgeCard
          key={achievement.id}
          image={achievement.image}
          title={achievement.title}
          description={achievement.description}
          rarity={achievement.rarity}
        />
      ))}
    </div>
    </>
  );
}
