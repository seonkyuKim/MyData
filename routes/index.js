const router = require("express").Router();
const mongoose = require('mongoose');

const Order = mongoose.model("Order");
const Product = mongoose.model("Product");
const Store = mongoose.model('Store');

router.post('/stores', function(req, res, next) {
  let store = new Store();
  store.name = req.body.name;
  store.representative = req.body.representative;

  store.save().then().catch(next);
})

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
  
  product.stock = req.body.stock;

  product
    .save()
    .then(() => {
      Store.findOne({ name: req.body.storeName }, (err, store) => {
        if(store) {
          product.push(store);
          res.json(product.toJSON());
        }
      })
    })
    .catch(next);
});

router.get("/salesDetail", function(req, res, next) {});

module.exports = router;
