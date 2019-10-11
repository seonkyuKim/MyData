const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    
    timestamps: Date,
    purchaseType: String,   // 구매 방식
    orderType: String,  // 매출 구분 = 정상, 할인
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    number: Number,
    discount: Number,
    totalSales: Number,
    VAT: Number,
    netSales: Number,
    customer: String,
    isDelivery: Boolean,
    pickupTime: Date,
    acceptTime: Date,
    status: String

}, { timestamps: false });



OrderSchema.methods.toJSON = function (user) {
    return {
        orderId: this._id,
        timestamps: this.timestamps,
        purchaseType: this.purchaseType,   // 구매 방식
        orderType: this.orderType,  // 매출 구분 = 정상, 할인
        product: this.product,
        number: this.number,
        discount: this.discount,
        totalSales: this.totalSales,
        VAT: this.VAT,
        netSales: this.netSales,
        customer: this.customer,
        isDelivery: this.isDelivery,
        pickupTime: this.pickupTime,
        acceptTime: this.acceptTime,
        status: this.status,
        billing: this.billing
    };
};

mongoose.model('Order', OrderSchema);
