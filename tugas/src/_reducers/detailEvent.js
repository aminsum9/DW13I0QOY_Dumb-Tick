import { GET_DETAIL_EVENT } from "../config/constants";

const initialState = {
  data: [],
  isLoading: false,
  error: false
};

export const detailevent = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_DETAIL_EVENT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_DETAIL_EVENT}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        data: action.payload.data,
        isLoading: false
      };
    case `${GET_DETAIL_EVENT}_REJECTED`:
      return {};
    default:
      return state;
  }
};
