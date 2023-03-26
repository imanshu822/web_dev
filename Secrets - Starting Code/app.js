//jshint esversion:6
require('dotenv').config(); // load environment variables from a .env file (not used in this code)

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // import bcrypt library for password hashing
const saltRound = 10; // define the number of salt rounds to use for password hashing

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

// Render the home page when the root URL is accessed
app.get("/", function(req, res){
    res.render("home");
});

// Render the login page when the /login URL is accessed
app.get("/login", function(req, res){
    res.render("login");
});

// Render the registration page when the /register URL is accessed
app.get("/register", function(req, res){
    res.render("register");
});

// Handle user registration when the registration form is submitted
app.post("/register", async function(req, res){

    // Hash the user's password before storing it in the database
    bcrypt.hash(req.body.password, saltRound, async function(err, hash){

        const newUser = new User({
            email: req.body.username,
            password: hash
        });

        try {
            await newUser.save();
            res.render("secrets"); // render the secrets page if registration is successful
        } catch(err){
            console.log(err);
            res.redirect("/register"); // redirect to the registration page in case of an error
        };
    })
});

// Handle user login when the login form is submitted
app.post("/login", async function(req, res){

    const username = req.body.username;
    const password = req.body.password;

    try {
        const foundUser = await User.findOne({email: username});
        // Hash the password entered by the user and compare it with the hashed password in the database
        const result = await bcrypt.compare(password, foundUser.password);
        if(result) { // compare hashed password
            res.render("secrets"); // render the secrets page if login is successful
        } else {
            res.redirect("/login"); // redirect to the login page in case of incorrect credentials
        }
    } catch (err) {
        console.log(err);
        res.redirect("/login"); // redirect to the login page in case of an error
    }
});


// Start the server and listen on port 3000
app.listen(3000, function() {
    console.log("Server started on port 3000");
});
