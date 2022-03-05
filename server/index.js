const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const port = process.env.PORT || 3000;

const csv = require("csv-parser");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require('fs');
const Transform = require("stream").Transform;


const csvStringifier = createCsvStringifier({
  header: [
    { id: "id", title: "id" },
    { id: "styleId", title: "styleId" },
    { id: "url", title: "url" },
    { id: "thumbnail_url", title: "thumbnail_url" },
  ],
});

let readStream = fs.createReadStream("./database/photosSample.csv");
let writeStream = fs.createWriteStream("./database/photosDestination.csv");
class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }
}

const transform = function(chunk, encoding, next) {
  //transform here! :)
}

app.listen(port, () => {
  console.log(`The app server is running on port: ${port}!`);
})

