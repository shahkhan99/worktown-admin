import {MEMBER_LIST} from '../constants';
const initialState = {
  members: {},
};
const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEMBER_LIST:
      return {
        ...state,
        members: action.payload,
      };
    default:
      return state;
  }
};
export default membersReducer;
