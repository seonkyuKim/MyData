const mongoose = require("mongoose");

const WarehousingSchema = new mongoose.Schema(
  {
    timestamps: Date,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  number: Number,
  }
);

WarehousingSchema.methods.toJSON = function(user) {
  return {
    timestamps: this.timestamps,
    product: this.product,
    number: this.number
  };
};

mongoose.model("Warehousing", WarehousingSchema);
