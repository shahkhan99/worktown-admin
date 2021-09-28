import {USER_NAME} from '../constants';

export function getName(name) {
  return {
    type: USER_NAME,
    payload: name,
  };
}
