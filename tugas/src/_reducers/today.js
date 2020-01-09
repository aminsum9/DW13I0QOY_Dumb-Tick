import { GET_EVENTS_TODAY } from "../config/constants";

const initialState = {
  today: [],
  isLoading: false,
  error: false
};

export const today = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_EVENTS_TODAY}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_EVENTS_TODAY}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        today: action.payload.data,
        isLoading: false
      };
    case `${GET_EVENTS_TODAY}_REJECTED`:
      return {};
    default:
      return state;
  }
};
