const mongoose = require("mongoose");
const Client = require("../models/client");
const Cart_item = require("../models/cart_item");
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/gamazon")
  .then(() => {
    console.log("OK connect to Gamazon");
  })
  .catch((err) => {
    console.log("something went wrong");
    console.log(err);
  });

Client.findOne({ name: "gaoxiang" })
  .populate("cart_items")
  .then((client) => {
    console.log(client);
  });
