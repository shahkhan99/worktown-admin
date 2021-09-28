import {USER_NAME} from '../constants';
const initialState = {
  name: {},
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_NAME:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
