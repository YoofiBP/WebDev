//jshint esversion:6

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const key = "5159e109b324af8b8198caffaf37d2b7-us20";
const audienceID = "41a95af197";

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;

  var details = {
    "members": [
      {email_address:email,
        "status": "subscribed",
        "merge_fields": {
          "FNAME": fname,
          "LNAME": lname
        }
      }]
    };

    var data = JSON.stringify(details);
    console.log(data);

    var options = {
      url: "https://us20.api.mailchimp.com/3.0/lists/"+audienceID,
      method: "POST",
      headers: {'Authorization': 'yoofibp '+key},
      body: data
    };

    request(options,function(error, response, body){
      if(error){
        console.log(error);
      }else{
        console.log(response.statusCode);
      }
      //console.log(response.statusCode);
    });
  });
  app.listen(port, function(){
    console.log("Server running on port "+port);
  });
