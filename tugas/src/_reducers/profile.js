import { GET_PROFILE } from "../config/constants";

const initialState = {
  profile: [],
  isLoading: false,
  error: false
};

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_PROFILE}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_PROFILE}_FULFILLED`:
      return {
        ...state,
        profile: action.payload.data,
        isLoading: false
      };
    case `${GET_PROFILE}_REJECTED`:
      return {};
    default:
      return state;
  }
};
