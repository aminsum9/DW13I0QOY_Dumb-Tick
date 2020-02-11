const jwt = require("jsonwebtoken");
const models = require("../models");
const bcrypt = require("bcryptjs");
const Events = models.events;
const Users = models.users;
const Favorite = models.favorite;

//Login
exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Users.findOne({
    where: { email, password }
  }).then(user => {
    if (user) {
      const token = jwt.sign({ id: user.id }, "amin");
      //async storage
      // AsyncStorage.setItem('token', name);
      res.send({
        message: "success",
        name: user.name,
        token
      });
    } else {
      res.send({
        error: true,
        message: "wrong email or password"
      });
    }
  });
};

// //Register
exports.register = (req, res) => {
  let bodyName, bodyPhone, bodyEmail, bodyImage, bodyUsername, bodyPassword;
  const { name, phone, email, image, role, username, password } = req.body;

  bodyName = name.trim();
  bodyPhone = phone.trim();
  bodyEmail = email.trim();
  bodyImage = image.trim();
  bodyUsername = username.trim();
  bodyPassword = password.trim();

  Users.findAll({ where: { email: bodyEmail } }).then(email => {
    if (email.length > 0) {
      res.status(200).json({
        message: "email has been used"
      });
    } else {
      Users.findAll({ where: { username: bodyUsername } })
        .then(username => {
          if (username.length > 0) {
            res.status(200).json({
              message: "username has been used"
            });
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              if (err) {
                res.status(400).json({
                  message: "bad request"
                });
              } else {
                bcrypt.hash(bodyPassword, salt, (err, hash) => {
                  if (err) {
                    res.status(400).json({
                      message: "server response error"
                    });
                  } else {
                    Users.create({
                      name: bodyName,
                      phone: bodyPhone,
                      email: bodyEmail,
                      image: bodyImage,
                      role: role,
                      username: bodyUsername,
                      password: bodyPassword
                    }).then(data => {
                      if (data) {
                        const token = jwt.sign({ id: data.id }, "amin");
                        res.status(200).json({
                          message: "success",
                          token
                        });
                      } else {
                        res.status(400).json({
                          message: "add user failed"
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        })
        .catch(error => {
          res.status(500).json({ error });
        });
    }
  });
};

// exports.register = (req, res) => {
//   Users.create(req.body).then(user =>
//     res.send({
//       message: "success register",
//       user
//     })
//   );
// };

//GET All Users
exports.getAllUsers = (req, res) => {
  Users.findAll({}).then(data => res.send(data));
};

// Task 7
//GET Profile
exports.getProfile = (req, res) => {
  Users.findOne({
    where: { id: userId }
  }).then(data => res.send(data));
};
//UPDATE Profile
exports.updateProfile = (req, res) => {
  Users.update(req.body, { where: { id: userId } }).then(data =>
    res.send({ message: `success update profile` })
  );
};

//CREATE Favorite
exports.createFavorite = (req, res) => {
  const eventId = req.body.event_id;
  // console.log(userId);
  Favorite.findOne({
    where: { user_id: userId, event_id: req.body.event_id }
  }).then(favorite => {
    //   console.log(fav);
    // });
    if (favorite != null) {
      // res.send({ message: "failed" });
      // console.log(req.body.event_id);
      Favorite.destroy({
        where: { event_id: eventId, user_id: req.body.user_id }
      }).then(data => res.send({ message: "success delete favorite" }));
    } else {
      Favorite.create({
        user_id: req.body.user_id,
        event_id: eventId
      }).then(data => res.send({ message: "success add favorite" }));
      // console.log(req.body.event_id)
    }
  });
};

//GET Favorite
exports.getFavorites = (req, res) => {
  Favorite.findAll({
    where: { user_id: userId },
    attributes: ["id", "user_id", "event_id"],
    include: {
      model: Events,
      attributes: ["id", "image", "title", "description"],
      extends: ["urlMap"]
    }
  }).then(data => res.send(data));
};
