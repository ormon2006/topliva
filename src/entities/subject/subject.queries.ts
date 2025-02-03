import { getGrades, getGroups, getUserSubjects } from './subject.api';
import {
  useQuery,
  queryOptions as tsqQueryOptions,
} from '@tanstack/react-query';

const keys = {
  root: () => ['subjects'],
  subject: () => [...keys.root(), 'subject'] as const,
  groups: () => ['mentorGroups'] as const,
  grades: () => ['mentiorGrades'] as const,
};

export function useGetSubjects() {
  return useQuery({
    queryKey: keys.subject(),
    queryFn: getUserSubjects,
  });
}

export function useGetGroups() {
  return useQuery({
    queryKey: keys.groups(),
    queryFn: getGroups,
  });
}

export function useGetGrades(courseId, groupId) {
  return useQuery({
    queryKey: ['grades', courseId, groupId], // Передаем параметры для запроса
    queryFn: getGrades,
    enabled: !!courseId && !!groupId, // Запрос отправляется только если параметры существуют
  });
}
