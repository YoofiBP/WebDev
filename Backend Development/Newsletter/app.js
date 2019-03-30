//jshint esversion:6

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;

  console.log(fname,lname,email);
});
app.listen(port, function(){
  console.log("Server running on port "+port);
});
