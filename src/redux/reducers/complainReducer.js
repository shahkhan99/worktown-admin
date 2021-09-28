import {COMPLAIN_LIST} from '../constants';
const initialState = {
  complains: [],
};
const complainReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPLAIN_LIST:
      return {
        ...state,
        complains: action.payload,
      };
    default:
      return state;
  }
};
export default complainReducer;
