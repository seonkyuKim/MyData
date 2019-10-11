const mongoose = require("mongoose");

const BillingSchema = new mongoose.Schema(
  {
    numberOfCustomers: { type: Number, default: 1 },
    finalOrderer: String,
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
  },
  { timestamps: true }
);

UserSchema.methods.getProfile = function(user) {
  return {
    main_email: this.email,
    phoneNumber: this.phoneNumber,
    name: this.name,
    birthdate: this.birthdate,
    gender: this.gender,
    isAdmin: this.isAdmin
  };
};

mongoose.model("Billing", UserSchema);
