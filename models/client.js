const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Cart_item = require("./cart_item");

let ClientSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  phoneNumber: Number,
  deliverDate: String,
  payment: {
    type: String,
    enum: ["credit card", "convenient store"],
  },
  zipCode: Number,
  cart_items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cart_item",
    },
  ],
});

module.exports = mongoose.model("Client", ClientSchema);
