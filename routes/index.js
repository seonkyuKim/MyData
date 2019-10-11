const router = require("express").Router();
const mongoose = require("mongoose");
const db = mongoose.connection;

const Order = mongoose.model("Order");
const Product = mongoose.model("Product");
const Store = mongoose.model("Store");
const Billing = mongoose.model("Billing");
const Warehousing = mongoose.model("Warehousing");
const StoredNReleased = mongoose.model("StoredNReleased");

router.post("/stores", function(req, res, next) {
  let store = new Store();
  store.name = req.body.name;
  store.representative = req.body.representative;

  store
    .save()
    .then(() => {
      return res.json(store.toJSON());
    })
    .catch(next);
});

router.post("/products", function(req, res, next) {
  Store.findOne({ name: req.body.storeName }, (err, store) => {
    const product = new Product();
    product.code = req.body.code;
    product.name = req.body.name;
    product.bigCategory = req.body.bigCategory;
    product.middleCategory = req.body.middleCategory;
    product.smallCategory = req.body.smallCategory;
    product.price = req.body.price;
    product.cost = req.body.cost;
    product.store = store;

    product.save().then(() => {
      return res.json(product.toJSON());
    });
  });
});

router.post("/orders", function(req, res, next) {
  Product.findOne({ name: req.body.productName }, (err, product) => {
    const order = new Order();

    order.timestamps = req.body.timestamps;
    order.purchaseType = req.body.purchaseType;
    order.orderType = req.body.orderType; // 매출구분, 정상 할인
    order.product = product;
    order.number = req.body.number;
    order.discount = req.body.discount;

    // 총 매출액 = 정가x수량 - 할인금액
    order.totalSales = product.price * req.body.number - req.body.discount;

    // 부가세 계산
    normalVAT = Math.floor(Number(product.price) / 11);
    discountVAT = Math.floor(Number(order.discount) / 11);
    order.VAT = (normalVAT - discountVAT) * order.number;

    // NET 매출
    (order.netSales = order.totalSales - order.VAT),
      (order.customer = req.body.customer);
    order.isDelivery = req.body.isDelivery;
    order.pickupTime = req.body.pickupTime;
    order.acceptTime = req.body.acceptTime;
    order.status = req.body.status;

    product.stock = product.stock - req.body.number;
    product.save();

    order
      .save()
      .then(() => {
        const storedNReleased = new StoredNReleased();
        storedNReleased.order = order;
        storedNReleased.product = product;
        storedNReleased.save();
        return res.json(order.toJSON());
      })
      .catch(next);
  });
});

router.post("/billings", function(req, res, next) {
  Order.findById(req.body.orderID, function(err, order) {
    const billing = new Billing();
    billing.timestamps = req.body.timestamps;
    billing.cashAmount = req.body.cashAmount;
    billing.cardAmount = req.body.cardAmount;
    billing.cardCompany = req.body.cardCompany;
    billing.order = order;

    billing.save().then(() => {
      return res.json(billing.toJSON());
    });
  });
});

router.post("/warehousing", function(req, res, next) {
  Product.findOne({ name: req.body.productName }, (err, product) => {
    const warehousing = new Warehousing();
    warehousing.timestamps = req.body.timestamps;
    warehousing.product = product;
    warehousing.number = req.body.number;
    product.stock = product.stock + req.body.number;

    product.save();
    warehousing.save().then(() => {
      const storedNReleased = new StoredNReleased();
      storedNReleased.warehousing = warehousing;
      storedNReleased.product = product;
      storedNReleased.save();
      return res.json(warehousing.toJSON());
    });
  });
});

// 세부매출내역현황
router.get("/salesDetail", function(req, res, next) {
  db.collection("orders")
    .aggregate([
      {
        $lookup: {
          from: "billings",
          localField: "_id",
          foreignField: "order",
          as: "billing"
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $project: {
          timestamps: 1,
          orderType: 1,
          "product.code": 1,
          "product.name": 1,
          number: 1,
          discount: 1,
          totalSales: 1,
          VAT: 1,
          netSales: 1,
          customer: 1,
          "billing.cashAmount": 1,
          "billing.cardAmount": 1
        }
      }
    ])
    .toArray()
    .then(function(data) {
      return res.json(data);
    });
});

// 영수증별 매출 현황
router.get("/receipts", function(req, res, next) {
  Billing.find({}, (err, billings) => {
    return res.json(billings);
  });
});

// 상품별 매출현황
router.get("/productSales", function(req, res, next) {
  db.collection("orders")
    .aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $project: {
          timestamps: 1,
          orderType: 1,
          "product.bigCategory": 1,
          "product.middleCategory": 1,
          "product.smallCategory": 1,
          "product.code": 1,
          "product.name": 1,
          "product.price": 1,
          number: 1,
          discount: 1,
          totalSales: 1,
          VAT: 1,
          netSales: 1,
          customer: 1
        }
      }
    ])
    .toArray()
    .then(function(data) {
      return res.json(data);
    });
});

// 상품별 입출고현황
router.get('/storedNReleased', function(req, res, next) {
  db.collection("storednreleaseds")
    .aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $lookup: {
          from: "orders",
          localField: "order",
          foreignField: "_id",
          as: "order"
        }
      },
      {
        $lookup: {
          from: "warehousings",
          localField: "warehousing",
          foreignField: "_id",
          as: "warehousing"
        }
      },
      {
        $project: {
          
          "product.code": 1,
          "product.name": 1,
          "product.bigCategory": 1,
          "product.middleCategory": 1,
          "product.smallCategory": 1,
          "product.price": 1,
          "product.cost": 1,
          "order.number": 1,
          "order.timestamps": 1,
          "warehousing.number": 1,
          "warehousing.timestamps": 1,
        }
      }
    ])
    .toArray()
    .then(function(data) {
      return res.json(data);
    });
})

module.exports = router;
