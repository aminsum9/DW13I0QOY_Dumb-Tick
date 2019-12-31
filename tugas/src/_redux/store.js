import { createStore, combineReducers, applyMiddleware } from "redux";

import { categories } from "../_reducers/categories";
import { events } from "../_reducers/events";
import { category } from "../_reducers/category";
import { detailevent } from "../_reducers/detailEvent";

import { promise, logger } from "./middleware";

//GET All reducers avaiable
const rootReducers = combineReducers({
  categories,
  category,
  detailevent,
  events
});

//SetUp Store Redux
const store = createStore(rootReducers, applyMiddleware(promise, logger));

export default store;
