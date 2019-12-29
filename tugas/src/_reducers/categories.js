import { GET_CATEGORIES } from "../config/constants";

const initialState = {
  data: [],
  isLoading: false,
  error: false
};

export const categories = (state = initialState, action) => {
  switch (action) {
    case `${GET_CATEGORIES}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_CATEGORIES}_FULLFILED`:
      console.log(action.payload);
      return {
        ...state,
        data: action.payload.data
      };
    case `${GET_CATEGORIES}_REJECTED`:
      return {};
    default:
      return state;
  }
};
