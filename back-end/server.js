const controllerCategories = require("./controller/categories");
const controllerEvents = require("./controller/events");
const controllerAuth = require("./controller/Auth");
const controllerOrder = require("./controller/order");

const { authenticated } = require("./middleware");

require("express-group-routes");

const cors = require("cors");

const express = require("express");

// const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.use(express.json());

const port = 5000;

app.group("/api/eo", router => {
  //Task 1 -- req.query still uncompleted
  // GET All Category
  router.get("/categories", controllerCategories.getAllCategory);
  //Add Categories
  router.post("/category", controllerCategories.addCategory);
  // GET events
  router.get("/allevents", controllerEvents.getAllEvents);
  //GET events by title and time
  router.get("/events", controllerEvents.getEventsByTitle);
  //GET event by startTime tomorrow -- not created yet

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
  //GET detail Event
  router.get("/event/:id", controllerEvents.getEventById);
  //POST Order --error
  router.post("/event/:id/order", controllerOrder.addOrder);

  //Task 7
  //GET Detail Profile
  router.get("/profile", authenticated, controllerAuth.getProfile);
  //GET Favourite by user_id --not created yet

  //Task 8
  //Update PAYMENT
  router.put("/order/:id", controllerOrder.updatePaymentStatus);
  //GET All Orders
  router.get("/orders", controllerOrder.getAllOrder);
  //show orders where event.createdBy = user_id
  router.get("/ordersevent", authenticated, controllerOrder.getOrderInPayment);

  // Task 9
  //GET Order where status = confirmed
  router.get("/order?", authenticated, controllerOrder.getOrderConfirmed);

  //Task 10
  router.post("/event", authenticated, controllerEvents.addEvent);
});

app.listen(port, () => console.log(`listening to port ${port}!`));
