const events = require("../models").events;
const categories = require("../models").categories;
const users = require("../models").users;
const sequelize = require("sequelize");
const Op = sequelize.Op;
const Helper = require("../helper/helper");

//Today & Upcomming events
exports.today = (req, res) => {
  let message = "";

  events
    .findAll({
      attributes: {
        exclude: ["category_id", "user_id", "createdAt", "updatedAt", "urlMap"]
      },
      include:
        //  ]
        {
          model: categories,
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        },
      // ,{
      //   model: User,
      //   as: "user",
      //   attributes: {
      //     exclude: ["password", "createdAt", "updatedAt"]
      //   }
      // }
      // ],
      where: {
        startTime: {
          [Op.substring]: Helper.getDateToday()
        }
        // start_time: today
      }
    })
    .then(data => {
      if (!data.length) {
        message = "Data Not found";
        // data = {}
        res.status(200).json(data);
      } else {
        res.status(200).json(data);
      }
    })
    .catch(error => {
      message = "Bad request";
      res.status(400).json({ message });
    });
};

exports.upcoming = (req, res) => {
  let message = "";
  let date = Helper.getNextDateFromToday();

  events
    .findAll({
      attributes: {
        exclude: ["category_id", "user_id", "createdAt", "updatedAt", "urlMap"]
      },
      include: [
        {
          model: categories,
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        }
        // ,{
        //   model: User,
        //   as: "user",
        //   attributes: {
        //     exclude: ["password", "createdAt", "updatedAt"]
        //   }
        // }
      ],
      where: {
        startTime: {
          [Op.gt]: date
        }
      }
    })
    .then(data => {
      if (!data.length) {
        res.status(200).json(data);
      } else {
        res.status(200).json(data);
      }
    })
    .catch(error => {
      message = "Bad request";
      res.status(400).json({ message });
    });
};

//SHOW all events
exports.getAllEvents = (req, res) => {
  events
    .findAll({
      attributes: {
        include: ["urlmaps"],
        exclude: [
          "urlMap",
          "userId",
          "category_id",
          "user_id",
          "createdAt",
          "updatedAt"
        ]
      },
      include: [
        {
          model: categories,
          attributes: ["id", "name"]
        },
        {
          model: users,
          as: "createdBy",
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
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${req.query.title}%`
            }
          },
          {
            startTime: {
              [Op.like]: `%${req.query.startTime}%`
            }
          }
        ]
      },
      attributes: {
        exclude: [
          "urlMap",
          "userId",
          "category_id",
          "user_id",
          "createdAt",
          "updatedAt"
        ]
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
        exclude: [
          "urlMap",
          "category_id",
          "user_id",
          "createdAt",
          "updatedAt",
          "userId"
        ]
        // include: ["urlmap"]
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
      attributes: {
        include: ["urlmaps"],
        exclude: [
          "urlMap",
          "userId",
          "category_id",
          "user_id",
          "createdAt",
          "updatedAt"
        ]
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
