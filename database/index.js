const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
  product_id: {type: Number, unique: true},
  name: String,
  description: String,
  category: String,
  default_price: Number,
  features: Array,
  skus:  //of objects in Features collection
});

let Product = mongoose.model('Product', productSchema); //THIS IS A MODEL, TEMPLATING WHAT OUR SCHEMAS WILL LOOK LIKE IN OUR COLLECTION

module.exports = {};

//NOTES ->
  // WHEN WE ADD OUR FIRST MODEL INTO OUR COLLECTION, show collections ON THE COMMAND LINE WILL SHOW US OUR COLLECTIONS. OUR COLLECTION WILL BE TITLED THE PLURAL VERSION OF THE WORD WE USE FOR OUR MODEL, SO OUR COLLECTION SHOULD BE TITLED 'Repos', PLURAL FOR 'Repo', OUR MODEL ON LINE 13.
  // db.products.find({}) shows whats inside the collection
  // mongosh opens up mongo interface (similar to mysql)

  // ETL OPTIONS
  // 1. create and run a node.js application to read and systematically populate database
  // 2. mongo import and aggregation pipelines - not ETL, but ELT
  // >> create indexes on the correct fields (without, the aggregation pipelines would take months to process)
  // >> spot instances - can go up to a t3 medium