const Order = require("../models").orders;

//update Payment
exports.updatePaymentStatus = (req, res) => {
  const id = req.params.id;
  Order.update(req.body, {
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
  Order.findAll({}).then(data => res.send(data));
};
