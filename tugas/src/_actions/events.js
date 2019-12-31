import { GET_EVENTS } from "../config/constants.js";
import axios from "axios";
//Setup Action Redux INC
export const getEvents = action => {
  return {
    type: GET_EVENTS,
    payload: axios({
      method: "GET",
      url: `http://localhost:5000/api/eo/allevents`
    })
  };
};
