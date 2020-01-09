import {
  GET_EVENTS,
  POST_EVENT,
  GET_EVENTS_TODAY,
  GET_EVENTS_UPCOMING
} from "../config/constants.js";
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

export const postEvent = event => {
  const token = localStorage.getItem("token");
  console.log(event);
  return {
    type: POST_EVENT,
    payload: axios({
      method: "POST",
      url: `http://localhost:5000/api/eo/event`,
      data: event,
      headers: {
        Authorization: "Bearer " + token
      }
    })
  };
};

//GET Event Today
export const getEventToday = action => {
  return {
    type: GET_EVENTS_TODAY,
    payload: axios({
      method: "GET",
      url: `http://localhost:5000/api/eo/today/events`
    })
  };
};

//GET Event Upcoming
export const getEventUpcoming = action => {
  return {
    type: GET_EVENTS_UPCOMING,
    payload: axios({
      method: "GET",
      url: `http://localhost:5000/api/eo/upcoming/events`
    })
  };
};
