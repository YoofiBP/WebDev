

const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){

  var today = new Date();
  console.log(today);
  res.send("working");
})
app.listen(port, function(){
  console.log("Server running on port "+port);
})
