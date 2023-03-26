const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){

    const query = req.body.cityName;
    // console.log(req.body.cityName);
    const apiKey = "95b59174015733bf500ca406af83c37d";
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units="+ units;
    https.get(url, function(response){{
        // console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            // console.log(weatherData)
            const temp = weatherData.main.temp
            // console.log(temp)
            const weatherDisc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"

            console.log(weatherDisc);
            res.write("<h1>The weather in "+query+" is " + temp + " degree Celcius</h1>");
            res.write("<p> The weather is currently " + weatherDisc +"<p>")
            res.write("<img src =" + imgURL +">")
            res.send();
        });
    }});
})

app.listen(3000, function(){
    console.log("Server is running at port 3000");
});
