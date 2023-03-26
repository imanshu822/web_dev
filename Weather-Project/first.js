const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=95b59174015733bf500ca406af83c37d&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            // console.log(data);
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            res.write("Temp at Londan is " + temp);
            const weather = weatherData.weather[0].description;
            res.write("<p>Weather at Londaon is " + weather + "</p>");
            const imgURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<img src= " +imgURL + ">");
            
            res.send();
        })
    })
})

app.listen(2000, function(){
    console.log("server is running at port 2000");
})