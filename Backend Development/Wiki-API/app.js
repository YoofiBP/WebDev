//jshint esversion:6
const express = require('express');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const ejs = require('ejs');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

app.listen(3000, function(){
  console.log("Server up and running on port 3000");
});
