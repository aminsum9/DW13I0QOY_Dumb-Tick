import { GET_EVENTS_UPCOMING } from "../config/constants";

const initialState = {
  upcoming: [],
  isLoading: false,
  error: false
};

export const upcoming = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_EVENTS_UPCOMING}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_EVENTS_UPCOMING}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        upcoming: action.payload.data,
        isLoading: false
      };
    case `${GET_EVENTS_UPCOMING}_REJECTED`:
      return {};
    default:
      return state;
  }
};
