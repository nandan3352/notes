const express = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = express.Router();
user.get("/", (req, res) => {
  res.send("All the user");
});
user.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) return res.send({ message: "somthing went wrong", status: 0 });
    try {
      let user_new = new User({ name, email, password: hash });
      await user_new.save();
      res.send({
        message: "User created",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });
    }
  });
});

user.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let option ={
    expiresIn:"300m"
  }
  try {
    let data = await User.find({ email });
    if (data.length > 0) {
      let token = jwt.sign({ userId: data[0]._id }, "saurabh",option);
      bcrypt.compare(password, data[0].password, function (err, result) {
        if (err)
          return res.send({ message: "Somthing went wrong:" + err, status: 0 });
        if (result) {
          res.send({
            message: "User logged in successfully",
            token: token,
            status: 1,
          });
        } else {
          res.send({
            message: "Incorrect password",
            status: 0,
          });
        }
      });
    } else {
      res.send({
        message: "User does not exist",
        status: 0,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

module.exports = { user };