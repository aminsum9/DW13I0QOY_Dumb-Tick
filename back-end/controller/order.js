const Orders = require("../models").orders;
const Events = require("../models").events;
const category = require("../models").categories;
const users = require("../models").categories;

// POST Order
// exports.addOrder = (req, res) => {
//   Events.findOne({
//     where: { id: req.params.id },
//     include: [{ model: category }, { model: users, as: "createdBy" }]
//   }).then(event => {
//     if (event === null) {
//       res.status(400).json({
//         message: "event not found"
//       });
//     } else {
//       const { quantity, status, attachment } = req.body;
//       Orders.create({
//         quantity: quantity,
//         totalPrice: quantity * event.price,
//         status: status,
//         attachment: attachment,
//         event_id: req.params.id
//       }).then(data => {
//         if (data === null) {
//           res.status(400).json({
//             message: "add payment failed"
//           });
//         } else {
//           res.send({
//             id: data.id,
//             event: {
//               id: event.id,
//               title: event.title,
//               category: {
//                 id: event.category.id,
//                 name: event.category.name
//               },
//               startTime: formatDate(event.startTime),
//               endTime: formatDate(event.endTime),
//               price: formatRupiah(event.price),
//               description: event.description,
//               address: event.address,
//               urlMaps: event.urlmap,
//               img: event.image,
//               createdBy: {
//                 id: event.user.id,
//                 name: event.user.name,
//                 phoneNumber: event.user.phone,
//                 email: event.user.email,
//                 img: event.user.image
//               },
//               quantity: data.quantity,
//               totalPrice: data.totalPrice,
//               attachment: data.attachment,
//               status: data.status
//             }
//           });
//         }
//       });
//     }
//   });
// };
exports.addOrder = (req, res) => {
  Orders.create(req.body).then(data =>
    res.send({
      data
    })
  );
};

//update Payment
exports.updatePaymentStatus = (req, res) => {
  const id = req.params.id;
  Orders.update(req.body, {
    where: { id: id }
  }).then(data =>
    res.send({
      message: "data updated successfuly",
      data
    })
  );
};

//GET APP Order
exports.getAllOrder = (req, res) => {
  Orders.findAll({}).then(data => res.send(data));
};

//GET Order Confirmed
exports.getOrderConfirmed = (req, res) => {
  Orders.findAll({
    where: {
      status: req.query.status
    },
    attributes: [
      "id",
      "quantity",
      "totalPrice",
      "status",
      "attachment",
      "event_id"
    ],
    include: {
      model: Events,
      attributes: [
        "id",
        "title",
        "startTime",
        "endTime",
        "price",
        "desctiption",
        "address",
        "urlmaps",
        "image"
      ],
      include: [
        {
          model: category,
          attributes: ["id", "name"]
        },
        {
          model: users
        }
      ]
    }
  }).then(order => res.send(order));
};
