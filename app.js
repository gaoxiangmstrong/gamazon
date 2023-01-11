const express = require("express");
const app = express();
const mongoose = require("mongoose");
// requrie databases
const Book = require("./models/book");
const Cart_item = require("./models/cart_item");
const Client = require("./models/client");
const path = require("path");
//-----end of requrie databases
const port = 3000;
const bodyParser = require("body-parser");
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
mongoose.set("strictQuery", true);
// override delete method
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname + "/public")));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// gamazon db
mongoose
  .connect("mongodb://127.0.0.1:27017/gamazon")
  .then(() => {
    console.log("OK connect to Gamazon");
  })
  .catch((err) => {
    console.log("something went wrong");
    console.log(err);
  });

// connect to shop items database
// on /books home route
app.get("/books", async (req, res) => {
  const { book } = req.query;
  //if req.query exist, split the keyword and search for book title that match all the keywords
  if (book) {
    const keywords = book.split(" ");
    let regexs = [];
    for (let i = 0; i < keywords.length; i++) {
      regexs.push(new RegExp(keywords[i], "i"));
    }
    let books = await Book.find({ title: { $all: regexs } });
    res.render("books/index", { books });
  } else {
    let books = await Book.find({});
    books = books.slice(0, 10);
    res.render("books/index", { books });
  }

  // }
});
// page2 seperate page
app.get("/page2", async (req, res) => {
  let books = await Book.find({});
  books = books.slice(10, 20);
  console.log(books);
  res.render("books/index", { books });
});
// page3
app.get("/page3", async (req, res) => {
  let books = await Book.find({});
  books = books.slice(20, 30);
  res.render("books/index", { books });
});
// page4
app.get("/page4", async (req, res) => {
  let books = await Book.find({});
  books = books.slice(30);
  res.render("books/index", { books });
});

app.get("/clients/:name", async (req, res) => {
  try {
    const { name } = req.params;
    console.log(name);
    let all_item = await Client.findOne({ name: name }).populate("cart_items");
    if (!all_item) {
      return res.status(404).send("Client not found");
    }
    res.render("books/clients", { all_item });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// find all items in the cart and render it on cart page
app.get("/books/cart/all", async (req, res) => {
  let all_item = await Cart_item.find({});
  res.render("books/shopping_cart", { all_item });
});
// 1. put selected item into Cart_item collection
app.post("/books/cart/all", async (req, res) => {
  const b = await Book.findById(req.body.id);
  //check if the book in Cart_item exits. if true increament the quantity
  let item_existing = await Cart_item.findOne({ title: b.title });
  console.log(item_existing);
  if (item_existing) {
    await Cart_item.findOneAndUpdate(
      { title: b.title },
      { $inc: { quantity: 1 } }
    );
  } else {
    let new_item = new Cart_item({
      title: b.title,
      ISB_code: b.ISB_code,
      price: b.price,
      image: b.image,
      quantity: b.quantity,
    });
    await new_item.save();
  }

  // find all data in the Cart_item database
  res.redirect("/books");
});

//2. get the client
app.get("/books/cart/all/checkout", (req, res) => {
  let today = new Date();
  let nextDay = String(today.getDate() + 1).padStart(2, "0");
  let thirdDay = String(today.getDate() + 2).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let year = today.getFullYear();
  tomorrow = year + "/" + month + "/" + nextDay;
  secondDay = year + "/" + month + "/" + thirdDay;
  res.render("books/form", { today, secondDay });
});

//3. move cart_item to the client
app.post("/books/cart/all/checkout/client", async (req, res) => {
  let bs = await Cart_item.find({});
  let c = new Client(req.body);
  for (let b of bs) {
    c.cart_items.push(b);
  }
  // save cart_items to client and delete all cart_items
  await c.save();
  let customer = await c.populate("cart_items");
  console.log(customer);
  await Cart_item.deleteMany({});
  let items = customer.cart_items;

  // end of save...
  res.render("books/client_items", { customer, items });
});

// 4.add a delete route
app.delete("/books/cart/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params.id);
  let item = await Cart_item.findByIdAndDelete(id);
  console.log(item);
  res.redirect("/books/cart/all");
});
// 4. end of deleting books route

// app.get("books/:title/manga", (req, res) => {
//   let { title } = req.params;
//   console.log(title);
//   res.render("books/manga", { title });
// });

app.get("/books/:title", async (req, res) => {
  const { title } = req.params;
  const one_book = await Book.findOne({ title: title });
  res.render("books/one_book", { one_book });
});
// try to show the manga

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
