import {
  createGrades,
  editGrades,
  getGrades,
  getGroups,
  getUserSubjects,
} from './subject.api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const keys = {
  subjects: () => ['subjects'] as const,
  subject: () => [...keys.subjects(), 'subject'] as const,
  groups: () => ['mentorGroups'] as const,
  grades: (courseId?: number, groupId?: number) =>
    courseId && groupId
      ? (['grades', courseId, groupId] as const)
      : (['grades'] as const),
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

export function useGetGrades(courseId: number, groupId: number) {
  return useQuery({
    queryKey: keys.grades(courseId, groupId),
    queryFn: getGrades,
    enabled: !!courseId && !!groupId,
  });
}

export function useCreateGrades() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      grade,
      date,
      user,
      subject,
    }: {
      grade: number;
      date: string;
      user: number;
      subject: number;
    }) => createGrades(grade, date, user, subject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.grades() });
    },
  });
}

export function useEditGrades() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      grade,

    }: {
      id: number;
      grade: number;
    }) => editGrades(id, grade),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.grades() });
    },
  });
}
