import {MEMBER_LIST} from '../constants';

export function getMember(members) {
  return {
    type: MEMBER_LIST,
    payload: members,
  };
}
