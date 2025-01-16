import $api from '~shared/api';

export function getRankingByGroups() {
  return $api.get('groups/');
}

export function getRankingByStudents() {
  return $api.get('users/');
}
