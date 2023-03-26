//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
const User = new mongoose.model("User", userSchema);


const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("home");
});
app.get("/login", function(req, res){
    res.render("login");
});
app.get("/register", function(req, res){
    res.render("register");
});
app.post("/register", async function(req, res){
    const newUser = new User({
        email: req.body.username,
        password: md5(req.body.password)
    });
    try {
        await newUser.save();
        res.render("secrets");
    } catch(err){
        console.log(err);
        res.redirect("/register"); // add a redirect to the registration page in case of an error
    };
});

app.post("/login", async function(req, res){
    const username = req.body.username;
    const password = md5(req.body.password);
    try {
        const foundUser = await User.findOne({email: username});
        if(foundUser && foundUser.password === password) {
            res.render("secrets");
        } else {
            res.redirect("/login"); // add a redirect to the login page in case of incorrect credentials
        }
    } catch (err) {
        console.log(err);
        res.redirect("/login"); // add a redirect to the login page in case of an error
    }
});



app.listen(3000, function() {
    console.log("Server started on port 3000");
});
