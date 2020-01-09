import { GET_FAVORITES } from "../config/constants";

const initialState = {
  favorites: [],
  isLoading: false,
  error: false
};

export const favorites = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_FAVORITES}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_FAVORITES}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        favorites: action.payload.data,
        isLoading: false
      };
    case `${GET_FAVORITES}_REJECTED`:
      return {};
    default:
      return state;
  }
};
