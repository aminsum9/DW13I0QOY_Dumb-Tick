const jwt = require("jsonwebtoken");
const models = require("../models");
const Users = models.users;

//Login
exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Users.findOne({
    where: { email, password }
  }).then(user => {
    if (user) {
      const token = jwt.sign({ id: user.id }, "amin");
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
// exports.register = (req, res) => {
//   let bodyName,
//     bodyPhone,
//     bodyEmail,
//     bodyImage,
//     bodyRole,
//     bodyUsername,
//     bodyPassword;
//   const { name, phone, email, image, role, username, password } = req.body;

//   bodyName = name.trim();
//   bodyPhone = phone.trim();
//   bodyEmail = email.trim();
//   bodyImage = image.trim();
//   bodyRole = role.trim();
//   bodyUsername = username.trim();
//   bodyPassword = password.trim();

//   Users.findAll({ where: { email: bodyEmail } }).then(email => {
//     if (email.length > 0) {
//       res.status(200).json({
//         message: "email has been used"
//       });
//     } else {
//       Users.findAll({ where: { username: bodyUsername } })
//         .then(username => {
//           if (username.length > 0) {
//             res.status(200).json({
//               message: "username has been used"
//             });
//           } else {
//             bcrypt.genSalt(10, (err, salr) => {
//               if (err) {
//                 res.status(400).json({
//                   message: "bad request"
//                 });
//               } else {
//                 bcrypt.hash(bodyPassword, salt, (err, hash) => {
//                   if (err) {
//                     res.status(400).json({
//                       message: "server response error"
//                     });
//                   } else {
//                     Users.create({
//                       name: bodyName,
//                       phone: bodyPhone,
//                       email: bodyEmail,
//                       image: bodyImage,
//                       role: bodyRole,
//                       username: bodyUsername,
//                       password: bodyPassword
//                     }).then(data => {
//                       if (data) {
//                         const token = jwt.sign({ id: data.id }, "amin");
//                         res.status(200).json({
//                           message: "success",
//                           token
//                         });
//                       } else {
//                         res.status(400).json({
//                           message: "add user failed"
//                         });
//                       }
//                     });
//                   }
//                 });
//               }
//             });
//           }
//         })
//         .catch(error => {
//           res.status(500).json({ error });
//         });
//     }
//   });
// };
exports.register = (req, res) => {
  Users.create(req.body).then(user => {
    const tokenn = jwt.sign({ id: user.id }, "amin");
    res.send({
      message: "success register",
      tokenn
    });
  });
};

//GET All Users
exports.getAllUsers = (req, res) => {
  Users.findAll({}).then(data => res.send(data));
};

// Task 7
//GET Profile
exports.getProfile = (req, res) => {
  Users.findOne({
    where: { id: req.params.id }
  }).then(data => res.send(data));
};
