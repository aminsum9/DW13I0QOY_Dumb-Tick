import { GET_CATEGORY } from "../config/constants";

const initialState = {
  data: [],
  isLoading: false,
  error: false
};

export const category = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_CATEGORY}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_CATEGORY}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        data: action.payload.data,
        isLoading: false
      };
    case `${GET_CATEGORY}_REJECTED`:
      return {};
    default:
      return state;
  }
};
