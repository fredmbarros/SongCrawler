"use strict";
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

// const { MongoClient } = require("mongodb");
// const { MONGO_URI } = process.env;

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };




// Genius Search

const geniusSearch = () => {

    fetch("https://genius.p.rapidapi.com/search?q=" + searchTerm, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "genius.p.rapidapi.com",
            "x-rapidapi-key": "7ad4910444msh707052b566c420fp105e59jsn784037303d1b"
        }
    })
    .then(res => {
        console.log(res);
        searchResult = res;
    })
    .catch(err => {
        console.error(err);
    });
    
}
