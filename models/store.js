const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const StoreSchema = new mongoose.Schema({
    name: String,     // 매장명    
    business: String,    // 업태
    industry: String,   // 업종
    operatorType: String,   // 사업자구분
    profilePhoto: String,   // 프로필사진
    businessLicense: String,    // 사업자등록증
    representative: String,     //대표자
    phoneNumber: String,    // 연락처
    Address: String,        // 주소
    email: String           // 이메일
}, { timestamps: false });



StoreSchema.methods.getRepresentative = function (store) {
    return this.representative;
};

mongoose.model('Store', UserSchema);
