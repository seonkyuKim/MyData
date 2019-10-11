const router = require("express").Router();

const Order = mongoose.model("Order");
const Product = mongoose.model("Product");

router.post("/orders", function(req, res, next) {
  let order = new Order();
});

router.post("/products", function(req, res, next) {
  let product = new Product();

  product.code = req.body.product;
  product.name = req.body.name;
  product.bigCategory = req.body.bigCategory;
  product.middleCategory = req.body.middleCategory;
  product.smallCategory = req.body.smallCategory;
  product.price = req.body.price;
  product.cost = req.body.cost;
  product.store = req.body.store;
  product.stock = req.body.stock;

  product
    .save()
    .then(() => res.json(product.toJSON()))
    .catch(next);
});

router.get("/salesDetail", function(req, res, next) {});

module.exports = router;
