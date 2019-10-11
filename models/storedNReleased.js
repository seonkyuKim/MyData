const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const StoredNReleasedSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    warehousing: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehousing' },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
}, { timestamps: false });


StoredNReleasedSchema.methods.toJSON = function (store) {
    return {
        product: this.product,
        warehousing: this.warehousing,
        order: this.order
    }
};


mongoose.model('StoredNReleased', StoredNReleasedSchema);
