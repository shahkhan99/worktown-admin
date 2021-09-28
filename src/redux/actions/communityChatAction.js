import {COMMUNITY_CHAT} from '../constants';

export function getCommunityChat(chat) {
  return {
    type: COMMUNITY_CHAT,
    payload: chat,
  };
}
