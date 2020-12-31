import * as ActionTypes from './ActionTypes';

export const meditationstatus = (state = {meditationstatus: false}, action) => {
  switch (action.type) {
    case ActionTypes.SET_MEDITATION_STATUS:
      return {...state, errMess: null, meditationstatus: true};
      case ActionTypes.UNSET_MEDITATION_STATUS:
      return {...state, errMess: null, meditationstatus: false};
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};

    default:
      return state;
  }
};