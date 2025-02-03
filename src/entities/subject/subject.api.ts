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
  const [, courseId, groupId] = queryKey;
  return $api.get('/mentor-grades/', {
    params: { groupId, subjectId: courseId },
  });
}

export function createGrades(
  grade: number,
  date: string,
  user: number,
  subject: number
) {
  return $api.post('/mentor-grades/', {
    grade,
    date,
    user,
    subject,
  });
}

export function editGrades(
  id: number,
  grade: number,
  date: string,
  user: string,
  subject: number
) {
  return $api.put(`/mentor-grades/${id}/`, {
    grade,
    date,
    user,
    subject,
  });
}
