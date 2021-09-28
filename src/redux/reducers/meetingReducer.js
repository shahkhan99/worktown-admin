import {MEETING_LIST} from '../constants';
const initialState = {
  meetings: {},
};
const meetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEETING_LIST:
      return {
        ...state,
        meetings: action.payload,
      };
    default:
      return state;
  }
};
export default meetingReducer;
