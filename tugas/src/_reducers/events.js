import { GET_EVENTS } from "../config/constants";

const initialState = {
  events: [],
  isLoading: false,
  error: false
};

export const events = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_EVENTS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_EVENTS}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        events: action.payload.data,
        isLoading: false
      };
    case `${GET_EVENTS}_REJECTED`:
      return {};
    default:
      return state;
  }
};
