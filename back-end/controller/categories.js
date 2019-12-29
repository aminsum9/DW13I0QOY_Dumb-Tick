const Categories = require("../models").categories;

//get all category
exports.getAllCategory = (req, res) => {
  Categories.findAll({ attributes: ["id", "name"] }).then(data =>
    res.send(data)
  );
};
//Add Categories
exports.addCategory = (req, res) => {
  Categories.create(req.body).then(data =>
    res.send({
      message: "success Add Category",
      data
    })
  );
};
