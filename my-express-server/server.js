const express = require("express");
const app = express();

app.get("/", function(req, res){
  res.send("This is the first page of the website")
});

app.listen(3000, function(){
  console.log("server is running at localHost 3000");
});
