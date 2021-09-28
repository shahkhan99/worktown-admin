import {MEETING_LIST} from '../constants';

export function getMeetings(meetings) {
  return {
    type: MEETING_LIST,
    payload: meetings,
  };
}
