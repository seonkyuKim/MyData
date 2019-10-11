const mongoose = require("mongoose");

const BillingSchema = new mongoose.Schema(
  {
    timestamps: Date,
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    numberOfCustomers: { type: Number, default: 1 },
    finalOrderer: { type: String, default: "김민석" },
    numberOfProducts: { type: Number, default: 1 },
    serviceCharge: { type: Number, default: 0 },
    cashAmount: Number,
    cashAuthorizationAmount: { type: Number, default: 0 },
    cashNumber: { type: Number, default: 0 },

    cardAmount: Number,
    cardCompany: String,
    cardNumber: { type: Number, default: 1 },

    giftCard: { type: Number, default: 0 },
    point: { type: Number, default: 0 },
    downPayment: { type: Number, default: 0 },
    prepaidCard: { type: Number, default: 0 },
    couponNumber: { type: Number, default: 0 },
    couponAmount: { type: Number, default: 0 },
    creditAmount: { type: Number, default: 0 },
    environmentCharge: { type: Number, default: 0 },
    associatedCard: { type: Number, default: 0 },
    mobile: { type: Number, default: 0 },
    tmoneyCashbee: { type: Number, default: 0 },
    okCashback: { type: Number, default: 0 }
  }
);

BillingSchema.methods.toJSON = function(user) {
  return {
    timestamps: this.timestamps,
    order: this.order,
    cashAmount: this.cashAmount,
    cardAmount: this.cardAmount,
    cardCompany: this.cardCompany
  };
};

mongoose.model("Billing", BillingSchema);
