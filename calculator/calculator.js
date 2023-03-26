const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  var n1 = Number(req.body.num1);
  var n2 = Number(req.body.num2);
  var total = n1 + n2;
  res.send("sum of 2 numbers is " + total);
});

app.listen(4000, function(){
    console.log("Server is running at 4000");
});
