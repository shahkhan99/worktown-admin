import {LOCATION_LIST} from '../constants';

export function getLocations(location) {
  return {
    type: LOCATION_LIST,
    payload: location,
  };
}
