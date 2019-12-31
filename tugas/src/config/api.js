// Learn more or give us feedback
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api/eo"
});

export const register = newUser => {
  return axios
    .post("http://localhost:5000/api/eo/register", {
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      role: 1,
      image:
        "https://pbs.twimg.com/profile_images/831173492968140804/43M7c5j_.jpg",
      phone: newUser.phone
    })
    .then(response => {
      console.log(response);
      if (response.data.token === undefined) {
      } else {
        localStorage.setItem("token", response.data.token);
        return response.data;
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const login = user => {
  console.log(user);
  return axios
    .post("http://localhost:5000/api/eo/login", {
      email: user.email,
      password: user.password
    })
    .then(response => {
      console.log(response);
      if (response.data.token === undefined) {
      } else {
        localStorage.setItem("token", response.data.token);
        return response.data;
      }
    })
    .catch(err => {
      console.log(err);
    });
};
