import { GET_CATEGORY } from "../config/constants";
import axios from "axios";

export const getCategory = category_id => {
  return {
    type: GET_CATEGORY,
    payload: axios({
      method: "GET",
      url: `http://localhost:5000/api/eo/category/${category_id}/events`
    })
  };
};
