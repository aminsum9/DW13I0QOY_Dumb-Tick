import { createStore, combineReducers, applyMiddleware } from "redux";

import { categories } from "../_reducers/categories";
import { events } from "../_reducers/events";
import { addevent } from "../_reducers/addevent";
import { category } from "../_reducers/category";
import { detailevent } from "../_reducers/detailEvent";
import { profile } from "../_reducers/profile";
import { favorites } from "../_reducers/favorites";
import { today } from "../_reducers/today";
import { upcoming } from "../_reducers/upcoming";

import { promise, logger } from "./middleware";

//GET All reducers avaiable
const rootReducers = combineReducers({
  categories,
  category,
  detailevent,
  addevent,
  events,
  profile,
  favorites,
  today,
  upcoming
});

//SetUp Store Redux
const store = createStore(rootReducers, applyMiddleware(promise, logger));

export default store;
