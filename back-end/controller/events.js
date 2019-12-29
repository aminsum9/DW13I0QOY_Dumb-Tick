const events = require("../models").events;
const categories = require("../models").categories;
const users = require("../models").users;

exports.getAllEvents = (req, res) => {
  events
    .findAll({
      attributes: { exclude: ["userId"] },
      include: [
        {
          model: categories,
          attributes: ["id", "name"]
        },
        {
          model: users,
          attributes: ["id", "name"]
        }
      ]
    })
    .then(data => res.send(data));
};

exports.addEvent = (req, res) => {
  events.create(req.body).then(data =>
    res.send({
      message: "success add data",
      data
    })
  );
};

//Task 1
//GET Event by title
exports.getEventsByTitle = (req, res) => {
  events
    .findAll({
      where: { title: req.query.title },
      attributes: {
        exclude: ["userId"]
      }
    })
    .then(data => res.send(data));
};

// GET Event by Start Time
// exports.getEventByStartTime = (req, res) => {
//   events
//     .findAll({
//       where: { startTime: req.query.startTime },
//       attributes: { exclude: ["userId"] },
//       include: {
//         model: "categories",
//         foreign
//       }
//     })
//     .then(data => res.send(data));
// };

//Task 2
//GET events by category
exports.getEventsByCategory = (req, res) => {
  events
    .findAll({
      where: { category_id: req.params.category_id },
      attributes: {
        exclude: ["category_id", "user_id", "createdAt", "updatedAt", "userId"]
      },
      include: [
        {
          model: categories,
          attributes: ["id", "name"]
        },
        {
          model: users,
          as: "createdBy",
          attributes: ["id", "name", "phone", "email", "image"]
        }
      ]
    })
    .then(data => res.send(data));
};

// Task 6
//GET Event by id
exports.getEventById = (req, res) => {
  events
    .findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["userId"] }
    })
    .then(data => res.send(data));
};
