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

mongoose.model('Product', UserSchema);
