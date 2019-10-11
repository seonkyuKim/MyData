const mongoose = require("mongoose");

const WarehousingSchema = new mongoose.Schema(
  {
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  number: Number,
  },
  { timestamps: true }
);

// UserSchema.methods.getProfile = function(user) {
//   return {
//     main_email: this.email,
//     phoneNumber: this.phoneNumber,
//     name: this.name,
//     birthdate: this.birthdate,
//     gender: this.gender,
//     isAdmin: this.isAdmin
//   };
// };

mongoose.model("Warehousing", WarehousingSchema);
