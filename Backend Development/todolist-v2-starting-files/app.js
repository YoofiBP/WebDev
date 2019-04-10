//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Yoofi96:Dilweed86@cluster0-b5vo0.mongodb.net/todoList", {useNewUrlParser: true});

const ItemSchema = new mongoose.Schema({
  name :{
    type: String,
    required: [true, "You have to add something"]
  }
});

const ListSchema = new mongoose.Schema({
  name: String,
  items: [ItemSchema]
});

const Item = mongoose.model('Item', ItemSchema);
const List = mongoose.model('List', ListSchema);

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

List.find({name: "Home"}, function(err,results){
  if(err){
    console.log(err);
  }else if(results.length === 0){

    const newList = new List({
      name: "Home",
      items: []
    });
    newList.save();
    res.redirect("/");
  }else{
    res.render("list", {listTitle: "Home", newListItems: results, route:"/"});
  }
});
});

app.post("/", function(req, res){
  const item = req.body.newItem;
  const newItem = new Item({
    name: item
  });

  List.updateOne({name:"Home"},{$push : {items: newItem}},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Updated");
    }
  });
  res.redirect("/");
});

app.post("/delete/:listType", function(req, res){
  const deletedItem = req.body.deleted;
  const customListName = req.params.listType;
  List.updateOne({name: customListName},{$pull: {items: {_id:deletedItem}}}, function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect("/"+customListName);
    }
  });
});

app.get("/:listType", function(req,res){
  const customListName = _.capitalize(req.params.listType);
  List.find({name: customListName}, function(err, results){
    if(results.length === 0){
      const newList = new List({
        name: customListName,
        items: []
      });
      newList.save();
      res.redirect("/"+customListName);
    }else{
      res.render("list", {listTitle:customListName, newListItems: results, route:"/"+customListName});
    }
  });


});

app.post("/:listType", function(req,res){
  const customListName = req.params.listType;
  const item = req.body.newItem;

  const newItem = new Item({
    name: item
  });

  List.updateOne({name:customListName},{$push : {items: newItem}},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Updated");
    }
  });
  res.redirect("/"+customListName);
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
