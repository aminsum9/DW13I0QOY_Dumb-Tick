import { POST_EVENT } from "../config/constants";

const initialState = {
  data: [],
  isLoading: false,
  error: false
};

export const addevent = (state = initialState, action) => {
  switch (action.type) {
    case `${POST_EVENT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${POST_EVENT}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        event: action.payload.data,
        isLoading: false
      };
    case `${POST_EVENT}_REJECTED`:
      return {};
    default:
      return state;
  }
};
