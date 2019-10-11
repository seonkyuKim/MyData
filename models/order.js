const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    purchaseType: String,   // 구매 방식
    orderType: String,  // 매출 구분 = 정상, 할인
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    number: Number,
    discount: Number,
    totalSales: Number,
    VAT: Number,
    netSales: Number,
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    isDelivery: Boolean,
    pickupTime: Date,
    acceptTime: Date,
    status: String,
    billing: { type: mongoose.Schema.Types.ObjectId, ref: 'Billing' },

}, { timestamps: true });



UserSchema.methods.getProfile = function (user) {
    return {
        main_email: this.email,
        phoneNumber: this.phoneNumber,
        name: this.name,
        birthdate: this.birthdate,
        gender: this.gender,
        isAdmin: this.isAdmin,
    };
};

mongoose.model('Order', UserSchema);
