import { GET_PROFILE, GET_FAVORITES } from "../config/constants.js";
import axios from "axios";
//Setup Action Redux INC
export const getProfile = action => {
  const token = localStorage.getItem("token");
  return {
    type: GET_PROFILE,
    payload: axios({
      method: "GET",
      url: `http://localhost:5000/api/eo/profile`,
      headers: {
        Authorization: "Bearer " + token
      }
    })
  };
};

// export const updateProfile = data => {
//   const token = localStorage.getItem("token");
//   return {
//     type: UPDATE_PROFILE,
//     payload: axios({
//       method: "PUT",
//       url: `http://localhost:5000/api/eo/profile/edit`,
//       headers: {
//         Authorization: "Bearer " + token
//       },
//       data: data
//     })
//   };
// };

//GET Favorite
export const getFavorites = action => {
  const token = localStorage.getItem("token");
  return {
    type: GET_FAVORITES,
    payload: axios({
      method: "GET",
      url: `http://localhost:5000/api/eo/user/favorite`,
      headers: {
        Authorization: "Bearer " + token
      }
    })
  };
};
