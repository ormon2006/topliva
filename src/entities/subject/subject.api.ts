import $api from '~shared/api';

export function getUserSubjects() {
  return $api.get('subjects/');
}

export function getSubjectDetail() {
  return $api.get('');
}

export function getGroups() {
  return $api.get('/groups/mentor/me/', {
    params: {
      subjectId: 2,
    },
  });
}

export function getGrades({ queryKey }) {
  const [, courseId, groupId] = queryKey; // Получаем параметры из queryKey
  return $api.get('/mentor-grades/', {
    params: { groupId, subjectId: courseId }, // Передаем правильные параметры
  });
}

export function createGrades() {
  return $api.post('/mentor-grades/');
}

export function editGrades(id: number) {
  return $api.patch(`/mentor-grades/${id}`);
}
