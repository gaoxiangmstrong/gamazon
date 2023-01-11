const mongoose = require("mongoose");
const Book = require("../models/book");
const fs = require("fs");

mongoose
  .connect("mongodb://127.0.0.1:27017/gamazon")
  .then(() => {
    console.log("OK connect to Gamazon");
  })
  .catch((err) => {
    console.log("something went wrong");
    console.log(err);
  });

const testFolder = "./public/images";

let getRandom = () => {
  return Math.floor(Math.random() * 10000000000).toString();
};
const getImg = (title) => {
  return `/images/${title}.jpg`;
};
const randPrice = () => {
  return Math.floor(Math.random() * 1000);
};

const makeBook = (title) => {
  return {
    title: (title = title.replace(/\.[^/.]+$/, "")),
    ISB_code: getRandom(),
    price: randPrice(),
    image: getImg(title),
    quantity: 1,
  };
};

let booksArr = [];
fs.readdir(testFolder, (err, files) => {
  files.forEach((file) => {
    booksArr.push(makeBook(file));
  });
});

const save_to_db = async () => {
  await Book.deleteMany({});
  const books = await Book.insertMany(booksArr);
  console.log(books);
  console.log(books.length);
  await Book.findOneAndDelete({ name: ".DS_Store" });
};

save_to_db().then(() => {
  mongoose.connection.close();
  console.log("connection closed");
});
