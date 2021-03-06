const Orders = require("../models").orders;
const Events = require("../models").events;
const category = require("../models").categories;
const users = require("../models").categories;

// POST Order
exports.addOrder = (req, res) => {
  Events.findOne({
    where: { id: req.params.id },
    attributes: ["id", "price"],
    exclude: ["urlMap"]
    // include: [{ model: category }, { model: users, as: "createdBy" }]
  }).then(event => {
    if (event === null) {
      res.status(400).json({
        message: "event not found"
      });
    } else {
      const { quantity, status, attachment, buyer_id } = req.body;
      Orders.create({
        quantity: quantity,
        totalPrice: quantity * event.price,
        status: status,
        attachment: attachment,
        event_id: req.params.id,
        buyer_id: buyer_id
      }).then(data => {
        if (data === null) {
          res.status(400).json({
            message: "add payment failed"
          });
        } else {
          res.send({
            message: "success"
            // id: data.id,
            // event: {
            //   id: event.id,
            //   title: event.title,
            //   category: {
            //     id: event.category.id,
            //     name: event.category.name
            //   },
            //   startTime: formatDate(event.startTime),
            //   endTime: formatDate(event.endTime),
            //   price: formatRupiah(event.price),
            //   description: event.description,
            //   address: event.address,
            //   urlMaps: event.urlmap,
            //   img: event.image,
            //   createdBy: {
            //     id: event.user.id,
            //     name: event.user.name,
            //     phoneNumber: event.user.phone,
            //     email: event.user.email,
            //     img: event.user.image
            //   },
            //   quantity: data.quantity,
            //   totalPrice: data.totalPrice,
            //   attachment: data.attachment,
            //   status: data.status
            // }
          });
        }
      });
    }
  });
};
// exports.addOrder = (req, res) => {
//   Orders.create(req.body).then(data =>
//     res.send({
//       data
//     })
//   );
// };

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
  Orders.findAll({
    attributes: [
      "id",
      "quantity",
      "totalPrice",
      "status",
      "attachment",
      "event_id",
      "buyer_id"
    ],
    include: [
      {
        model: Events,
        attributes: {
          exclude: ["urlMap"]
        }
      }
      // {
      //   model: users,
      //   attributes: ["id", "name"]
      // }
    ]
  }).then(data => res.send(data));
};

//GET Order Confirmed
exports.getOrderByStatus = (req, res) => {
  Orders.findAll({
    where: {
      buyer_id: userId,
      status: req.query.status
    },
    attributes: [
      "id",
      "quantity",
      "totalPrice",
      "status",
      "attachment",
      "event_id",
      "buyer_id"
    ],
    include: {
      model: Events,
      attributes: [
        "id",
        "title",
        "startTime",
        "endTime",
        "price",
        "description",
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

//show order.event_id => confirmed = id event.user_id => yg login
// const cek = data => {
//  data.map(item => {
//    let item = {
//      id: item.id
//    }
//  })
// }

// const tes = data => {
//   data.map(item => {
//     Orders.findAll({ where: { event_id: item.id } }).then({
//       data
//     });
//   });
// };

exports.getOrderInPayment = (req, res) => {
  Events.findAll({
    where: { user_id: userId },
    attributes: ["id", "title", "user_id"]
  }).then(data => res.send(data));
};
// exports.getOrderInPayment = (req, res) => {
//   console.log(userId);
//   Events.findAll({
//     where: { user_id: userId },
//     attributes: ["id", "title", "user_id", "category_id"],
//     exclude: ["urlMaps"]
//   }).then(data =>
//     Orders.findAll(data.map{{ where: { event_id: data.id } }).then(order =>
//       res.send(order)
//     )
//   );
// };
// exports.getOrderInPayment = (req, res) => {
//   Orders.findAll({
//     where: {
//       buyer_id: userId,
//       status: "pending"
//     },
//     include: [
//       {
//         model: Events,
//         include: [
//            {
//              model: category
//            },
//           {
//             model: users
//           }
//         ]
//       },
//       {
//         model: users
//       }
//     ]
//   }).then(
//     data => res.send(data)
//      {
//      if (data.length > 0) {
//        res.status(200).json(newPayments(data));
//      } else {
//        res.status(200).json({
//          message: "data payment is not found",
//          result: false
//        }
//   );
//   }
//   });
// };
