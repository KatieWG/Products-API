const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const port = process.env.PORT || 3000;

// const csv = require("csv-parser");
// const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
// const fs = require('fs');
// const Transform = require("stream").Transform;
const mongoose = require('mongoose');
const { Product } = require('../database/schemas.js')
mongoose.connect('mongodb://localhost:27017/sdc')

//ROUTES



//Retrieves the list of products.
app.get("/products", (req, res) => { //WHY is this path running where the other is not???
  const targetResult = [
    {
          "id": 1,
          "name": "Camo Onesie",
          "slogan": "Blend in to your crowd",
          "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
          "category": "Jackets",
          "default_price": "140"
      },
  ]

  // Product.find()
  // .then(allProducts => {
  //   console.log('🥳🥳🥳🥳🥳 here are your products --->', allProducts)
  //   res.status(200).send(allProducts);
  // })
  // .catch(err => {
  //   console.log('🤬🤬🤬🤬🤬 err getting products --->', err)
  //   res.status(404).end;
  // })

  console.log('🔅🔅🔅🔅🔅 req.params------->', req.params) //WHY IS THIS ONE LOGGING

  // DATA => need only the fields listed above
  // QUERY => If this is the way, make a schema to filter the data (research this tomorrow)

})



//Returns all product level information for a specified product id.
app.get("/products/:product_id", (req, res) => {
  const targetResult = {
    "id": 11,
    "name": "Air Minis 250",
    "slogan": "Full court support",
    "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
    "category": "Basketball Shoes",
    "default_price": "0",
    "features": [
  	{
            "feature": "Sole",
            "value": "Rubber"
        },
  	{
            "feature": "Material",
            "value": "FullControlSkin"
        },
    ]
  }

  console.log('🟥🟥🟥🟥🟥req.params.product_id------->', req.params.product_id) //WHEN THIS ONE SHOULD BE
  // Product.find()
  // .then(allProducts => {
  //   console.log('🥳🥳🥳🥳🥳 here are your products --->', allProducts)
  //   res.status(200).send(allProducts);
  // })
  // .catch(err => {
  //   console.log('🤬🤬🤬🤬🤬 err getting products --->', err)
  //   res.status(404).end;
  // })

  // DATA => only change from previous call is the addition of the 'features' property = {features, value}
  // QUERY => make a new schema and use here to retrieve data filtered by product id
})



//Returns the all styles available for the given product.
app.get("/products/:product_id/styles", (req, res) => {
  const targetResult = {
    "product_id": "1",
    "results": [
  	{
            "style_id": 1,
            "name": "Forest Green & Black",
            "original_price": "140",
            "sale_price": "0",
            "default?": true,
            "photos": [
  			{
                    "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                    "url": "urlplaceholder/style_1_photo_number.jpg"
                },
  			{
                    "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                    "url": "urlplaceholder/style_1_photo_number.jpg"
                }
            ],
            "skus": {
                	"37": {
                    		"quantity": 8,
                    		"size": "XS"
                	},
                	"38": {
                    		"quantity": 16,
                    		"size": "S"
                	},
                	"39": {
                    		"quantity": 17,
                    		"size": "M"
                	},
            	}
    }
    ]
  }
  .then(productStyles => {
    productStyles.map(product => {
      if (product.default_style) {
      product.default_style = true;
      //and change the field name to 'default?' --> look this up or do a helpdesk

      //- change 'id' to 'style_id'

      //- add 'photos' and 'skus' properties onto each style
    } else {
      product.default_style = true;
      //and change the field name to 'default?' --> look this up or do a helpdesk

      //- change 'id' to 'style_id'

      //- add 'photos' and 'skus' properties onto each style
    }
  })

})
})
  /*
  DATA =>
    - make new collection 'styles' (may need to rename old 'styles' collection)
    - perform $lookup aggregation with the following changes in mind...

      - change "default_style: 0/1" to display "default: true/false"
      - switch locations of 'original price' and 'sale price'
      - change 'id' to 'style_id'
      - add 'photos' and 'skus' properties onto each style
    THAT ALL SAID: I could really do this the messy way which would just mean making a few queries to different collections to grab all necessary information. Unfortunately, that would need to happen on each page load/refresh, so definitely NOT an optimized solution

  QUERY => if I complete all the above steps, I should be able to index the product id and retrieve all relevant info with that
  */



//Returns the id's of products related to the product specified.
app.get("/products/:product_id/related", (req, res) => {
  const targetResult = [2,3,8,7];
  const exampleData = {
    _id: ObjectId("62227c0660b189c3072bf7a7"),
    id: 37,
    current_product_id: 7,
    related_product_id: 8
  };

  let relatedProductCollection = [];
  //retrieve all products that match the product id and return only the 'related' field for each
  db.products.find()
  .then(relatedProducts => {
    relatedProducts.map(relatedProduct => {
      relatedProductCollection.push(relatedProduct.related_product_id)
    })
  .catch(err => {
    console.log('ERR ON SERVER GET');
    res.sendStatus(404);
  })
  })
/*
  DATA => structured in a very strange way, which would take a while to lookup since there are many I'd need to find for one query.
  QUERY => for any product with the id X place related_product_id into an array located in product collection under same product id

  I'd like to write a pipeline here here that grabs all instances of the needed 'current_product_id' and makes an array from those objects' 'related_product_id's.
  */
})




























// *********** GARBAGE HEAP ***********


// const csvStringifier = createCsvStringifier({
//   header: [
//     { id: "id", title: "id" },
//     { id: "styleId", title: "styleId" },
//     { id: "url", title: "url" },
//     { id: "thumbnail_url", title: "thumbnail_url" },
//   ],
// });

// const container = (count) => {
//   class CSVCleaner extends Transform {
//   let readStream = fs.createReadStream("./database/photosSample.csv");
//   let writeStream = fs.createWriteStream("./database/photosDestination.csv");
//   constructor(options) {
//     super(options);
//   }

//   _transform(chunk, encoding, next) {
//       //transform here!
//       // chunk = 1 document
//       // How to import a csv file via the server?

//       // PLAN
//       // if current url thumbnail's last char is not a quotation mark,
//       // add one
//       // PSEUDOCODE
//       // NOTE: 800 = normal length for thumbnail url
//       // if length of this (stringified) chunk is greater than 800
//       //   split stringified chunk on newline symbol and * assign to variable *
//       //   for the first chunk -> add a quotation mark and curly brace to the end
//       //   use csv stringifier.stringifyRecords on a parsed version of new first chunk
//       //   push that ^ to 'this'

//       //   iterate over individual document chunks declared on line 2
//       //   split remaining chunks by their commas and * set to variable* ,
//       //   set onto object:
//       //     id = remaining chunk variable AT index 0 (id of current chunk iteration)
//       //     styleID = remaining chunk variable AT index 1 (style id of current chunk iteration)
//       //     url = remaining chunk variable AT index SLICE of (2 and current chunk at length - 1) (url of current chunk iteration)
//       //     thumbnail_url = remaining chunk variable AT index SLICE of(index 3 AT indexof "https", index 3 at indexof "&q=80" + 5 (aka the end))
//       //     end of object
//       //   let parsedChunk equal csvStringifier.stringifyRecords([obj])
//   }
// }
// }

// const transformer = new CSVCleaner({ writableObjectMode: true });

// //write header
// writeStream.write(csvStringifier.getHeaderString());

// readStream
//   .pipe(csv())
//   .pipe(transformer) // gets invoked on every chunk (each line of csv file)
//   .pipe(writeStream)
//   .on("finish", () => {
//     console.log("finished transforming and writing");
//   });

app.listen(port, () => {
  console.log(`The app server is running on port: ${port}!`);
})

