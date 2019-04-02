//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/shopDB", {useNewUrlParser: true});

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model("User",UserSchema);

const user =  new User({
  name: "Selasi",
  age: 7
});

user.save();
