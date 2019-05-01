const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', function(req,res){
  res.render('homepage');
});

app.get('/booking', function(req,res){
  res.render('booking_page');
});


app.listen(3000, function(){
  console.log("Server up on port 3000");
})
