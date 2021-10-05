import {AsyncStorage} from 'react-native';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import userReducer from '../reducers/userReducer';
import membersReducer from '../reducers/membersReducer';
import complainReducer from '../reducers/complainReducer';
import meetingReducer from '../reducers/meetingReducer';
import communityChatReducer from '../reducers/communityChatReducer';
import locationReducer from '../reducers/locationReducer';

const rootReducer = combineReducers({
  name: userReducer,
  members: membersReducer,
  complains: complainReducer,
  meetings: meetingReducer,
  //Here
  chat: communityChatReducer,
  location: locationReducer,
});
export const configureStore = createStore(rootReducer);
