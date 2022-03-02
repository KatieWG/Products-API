const mongoose = require('mongoose');

let productSchema = mongoose.Schema({

});

let Product = mongoose.model('Product', productSchema); //THIS IS A MODEL, TEMPLATING WHAT OUR SCHEMAS WILL LOOK LIKE IN OUR COLLECTION

module.exports = {};

  // WHEN WE ADD OUR FIRST MODEL INTO OUR COLLECTION, show collections ON THE COMMAND LINE WILL SHOW US OUR COLLECTIONS. OUR COLLECTION WILL BE TITLED THE PLURAL VERSION OF THE WORD WE USE FOR OUR MODEL, SO OUR COLLECTION SHOULD BE TITLED 'Repos', PLURAL FOR 'Repo', OUR MODEL ON LINE 13.
  // db.products.find({}) shows whats inside the collection
  // mongosh opens up mongo interface (similar to mysql)