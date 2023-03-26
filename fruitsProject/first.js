const mongoose = require('mongoose');
const { db } = require('./user');
mongoose.connect('mongodb://localhost:27017/first', {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
    name: String,
    rating:{
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit."
});

fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
})

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "Amy",
    age: 12,
    favoriteFruit: fruit
});

// person.save();



Fruit.find()
  .then(fruits => {
    mongoose.connection.close();
    fruits.forEach(function(fruit){
        console.log(fruit.name);
    })
  })
  .catch(error => {
    console.log(error);
  });
