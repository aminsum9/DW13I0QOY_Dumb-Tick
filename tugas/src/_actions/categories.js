import { GET_CATEGORIES, GET_CATEGORIES_PENDING } from "../config/constants.js";
import axios from "axios";
//Setup Action Redux INC
export const getCategories = action => {
  return {
    type: GET_CATEGORIES,
    payload: axios.get("http://localhost:5000/api/eo/categories")
  };
};

export const getCategoriesPending = users => {
  return {
    type: GET_CATEGORIES_PENDING
  };
};
