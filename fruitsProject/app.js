const mongoose = require('mongoose');
const User = require("./user");

mongoose.connect('mongodb://localhost:27017/first', {useNewUrlParser: true});

run();
async function run(){
    try{
    const user = new User({
        name: "Anshu",
        age: 22,
        hobbies: ["Play Crickey", "Football", "Voleyball"],
        address: {
            street: "Main Street",
            city: "New York"
        }

    });
    console.log(user);
    }catch(e){
        console.log(e.message);
    }
    

}