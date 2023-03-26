const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/devices", {useNewUrlParser: true, useUnifiedTopology: true});

const productSchema = new mongoose.Schema({
    Manufacturer: String,
    ModelName: String,
    Category: String,
    ScreenSize: String,
    Screen: String,
    CPU: String,
    RAM: String,
    Storage: String,
    GPU: String,
    OperatingSystem: String,
    Weight: String,
    PriceInEuros: String
});

const Product = mongoose.model("Product", productSchema);


app.get("/", async function(req, res){
    
    try {
        const brand = await Product.find({ Manufacturer: "Acer"}, {ModelName: 1,Category: 1, CPU:1, _id:0});
        res.send(brand);
        // console.log(brand);
        } catch (err) {
        console.error(err);
        res.send(err);
        }
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});