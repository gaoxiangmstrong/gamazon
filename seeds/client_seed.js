const mongoose = require("mongoose");
const Client = require("../models/client");
const Cart_item = require("../models/cart_item");
// const Book = require("../models/book");
mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/gamazon")
  .then(() => {
    console.log("OK connect to shop_items");
  })
  .catch((err) => {
    console.log("something went wrong");
    console.log(err);
  });

// const save_to_db = async () => {
//   await Client.deleteMany({});
//   // find cart_item by Id
//   let item_one = await Cart_item.findOne({ title: "ekusoshisuto" });
//   // make a new client
//   const client_one = new Client({
//     name: "gaoxiang",
//     address: "kyoto kyotanabe 30-47 405",
//     phoneNumber: 08079493281,
//   });
//   // push one cart_item to the client.
//   // console.log(client_one);
//   client_one.cart_items.push(item_one);
//   await client_one.save();
//   // console.log(client_one);
// };
// save_to_db();

Client.findOne({ name: "delete" })
  .populate("cart_items")
  .then((data) => {
    console.log(data);
  });
