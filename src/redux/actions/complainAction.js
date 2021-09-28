import {COMPLAIN_LIST} from '../constants';

export function getComplains(complains) {
  return {
    type: COMPLAIN_LIST,
    payload: complains,
  };
}
