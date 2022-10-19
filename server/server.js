const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 8080;
const app = express();
const url = "mongodb://localhost:27017/new";

const router = require("./router/api");

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(router);

// mongo connect

app.use("/uploads", express.static("uploads"));

const mongoose = require("mongoose");

mongoose.connect(url);

const conn = mongoose.connection;
conn.on("connected", function () {
  console.log("Successfully connected to MongoDB !!!");
});
conn.on("disconnected", function () {
  console.log("Successfully disconnected to MongoDB !!!");
});
conn.on("error", console.error.bind(console, "connection error:"));

app.listen(port, function () {
  console.log(port, "lisning");
});
