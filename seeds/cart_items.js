const mongoose = require("mongoose");
const Item = require("../models/item");

mongoose
  .connect("mongodb://127.0.0.1:27017/gamazon")
  .then(() => {
    console.log("OK connect to shop_items");
  })
  .catch((err) => {
    console.log("something went wrong");
    console.log(err);
  });

const save_to_db = async () => {
  await Item.deleteMany({});
  const b = new Item({
    title: "bleach",
    ISB_code: "4274739619",
    price: 232,
    image: "/images/bleach.jpg",
  });
  await b.save();
};
save_to_db();
