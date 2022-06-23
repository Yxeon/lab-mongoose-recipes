const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');
const arrayOfRecipes = require("./data.json")
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then ((response) => {
    return Recipe.insertMany(arrayOfRecipes)
  })
  .then ((response) => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese"},
      { duration: 100},
      { new: true }
    );
  })
  .then((response) => {
    Recipe.deleteOne({title: "Carrot Cake"})
    console.log("Deleted carrot cake")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

