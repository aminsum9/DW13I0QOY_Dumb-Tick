import { GET_DETAIL_EVENT } from "../config/constants";
import axios from "axios";

export const getDetailEvent = event_id => {
  return {
    type: GET_DETAIL_EVENT,
    payload: axios({
      method: "GET",
      url: `http://localhost:5000/api/eo/event/${event_id}`
    })
  };
};
