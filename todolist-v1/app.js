const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"))
app.set('view engine', 'ejs')
let items = ['buy food', 'cook food', 'eat food'];
let workItems = [];
app.get('/', function(req, res){
    var option = {
        weekday: 'long',
        year: 'numeric',
        month: 'long', 
        day: 'numeric' 
    }
    let today = new Date()
    let currDate = today.toLocaleDateString('en-US', option)
    res.render("list", {listTitle: currDate,newListItems: items})
});
app.post("/", function(req, res){
    console.log(req.body);
    let item = req.body.newItem;
    if(req.body.list === "work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});
app.get("/work", function(req, res){
    res.render("list",{listTitle: "Work List", newListItems: workItems });
});
app.post("/work",function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", function(req, res){
    res.render("about");
})
app.listen("3000",function(){
    console.log("server is running on port 4000");
});
