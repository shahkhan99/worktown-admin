//Here
import {COMMUNITY_CHAT, LOG} from '../constants';
const initialState = {
  chat: [],
};
const communityChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMUNITY_CHAT:
      return {
        ...state,
        chat: action.payload,
      };
    default:
      return state;
  }
};

export default communityChatReducer;
