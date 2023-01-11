const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Itemschema = new Schema({
  title: String,
  ISB_code: String,
  price: Number,
  image: String,
  quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Cart_item", Itemschema);
