import { GET_CATEGORIES } from "../config/constants.js";
import axios from "axios";
//Setup Action Redux INC
export const getCategories = () => {
  return {
    type: GET_CATEGORIES,
    payload: axios({
      method: "GET",
      url: "http://localhost:5000/api/eo/categories"
    })
  };
};
