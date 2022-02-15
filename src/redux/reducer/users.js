import { ADDREVIEW } from '../constants';
import { normalizedUsers } from '../../fixtures';

const defaultUsers = normalizedUsers.reduce(
  (acc, user) => ({...acc, [user.id]: user}),
  {}
);

export default (users = defaultUsers, action) => {
  const {type, userId, review} = action;

  switch(type) {
    case ADDREVIEW:
      const {name} = review;
      return {
        ...users,
        [userId]: {id: userId, name,}
      }
    default:
      return users;
  }
};