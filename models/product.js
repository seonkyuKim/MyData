const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    code: String,   // 상품코드
    name: String,   // 상품명
    bigCategory: String,    // 대분류
    middleCategory: String,     // 중분류
    smallCategory: String, // 소분류
    price: Number,  // 정가
    cost: Number,   // 매입가
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    stock: Number, // 재고
}, { timestamps: false });



ProductSchema.methods.toJSON = function (user) {
    return {
        code: this.code,
        name: this.name,
        bigCategory: this.bigCategory,
        middleCategory: this.middleCategory,
        smallCategory: this.smallCategory,
        price: this.price,
        cost: this.cost,
        store: this.store,
        stock: this.stock,
    };
};

mongoose.model('Product', ProductSchema);
