//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoList", {useNewUrlParser: true});

const ItemSchema = new mongoose.Schema({
  name :{
    type: String,
    required: [true, "You have to add something"]
  }
});

const Item = mongoose.model('Item', ItemSchema);

const itemOne = new Item({
  name: "Learn Authentication"
});

const itemTwo = new Item({
  name: "Learn EJS"
});

const itemThree = new Item({
  name: "Learn Databases"
});

const defaultItems = [itemOne, itemTwo, itemThree];



app.get("/", function(req, res) {

const day = date.getDate();

Item.find(function(err,results){
  if(err){
    console.log(err);
  }else if(results.length === 0){

    Item.insertMany(defaultItems, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Success!");
      }
    });
    res.redirect("/");
  }else{
    res.render("list", {listTitle: day, newListItems: results});
  }
});
});

app.post("/", function(req, res){
  const item = req.body.newItem;
  const newItem = new Item({
    name: item
  });
  newItem.save();
  res.redirect("/");
});

app.post("/delete", function(req, res){
  const deletedItem = req.body.deleted;
  Item.deleteOne({name: deletedItem}, function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect("/");
    }
  });
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
