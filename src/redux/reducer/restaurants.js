import { restaurants } from '../../../src/fixtures';

export default function (state = restaurants, action) {
  const {type} = action;
  switch (type) {
    default:
      return state;
  }
}