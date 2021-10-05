import {LOCATION_LIST} from '../constants';
const initialState = {
  location: {},
};
const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_LIST:
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
};
export default locationReducer;
