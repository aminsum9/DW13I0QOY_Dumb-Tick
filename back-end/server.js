const controllerCategories = require("./controller/categories");
const controllerEvents = require("./controller/events");
const controllerAuth = require("./controller/Auth");
const controllerOrder = require("./controller/order");

const { authenticated } = require("./middleware");

require("express-group-routes");

const cors = require("cors");

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.use(bodyParser.json());

const port = 5000;

app.group("/api/eo", router => {
  //Task 1
  // GET All Category
  router.get("/categories", controllerCategories.getAllCategory);
  //Add Categories
  router.post("/category", controllerCategories.addCategory);
  // GET events
  router.get("/events", controllerEvents.getAllEvents);
  //GET events by title
  router.get("/event", controllerEvents.getEventsByTitle);
  // GET event by start time
  // router.get("/event", controllerEvents.getEventByStartTime);

  //Task 2
  //GET events by category
  router.get(
    "/category/:category_id/events",
    controllerEvents.getEventsByCategory
  );

  //Task 3
  //Login
  router.post("/login", controllerAuth.login);
  //GET All Users
  router.get("/users", controllerAuth.getAllUsers);

  //Task 4
  //Register
  router.post("/register", controllerAuth.register);

  //Task 6
  //GET Events by id
  router.get("/event/:id", controllerEvents.getEventById);

  //Task 7
  //GET Detail Profile
  router.get("/profile/:id", authenticated, controllerAuth.getProfile);

  //Task 8
  //Update PAYMENT
  router.put("/order/:id", controllerOrder.updatePaymentStatus);
  //GET All Orders
  router.get("/orders", controllerOrder.getAllOrder);

  //Task 10
  router.post("/event", controllerEvents.addEvent);
});

app.listen(port, () => console.log(`listening to port ${port}!`));
