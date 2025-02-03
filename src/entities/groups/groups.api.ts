import $api from '~shared/api';

export function loginUserQuery() {
  return $api.get('users/me');
}
