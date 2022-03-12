const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const url = require('url');
const querystring = require('querystring');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const { Product, UpdatedProduct } = require('../database/schemas.js')
mongoose.connect('mongodb://localhost:27017/sdc')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//ROUTES
app.get("/products", (req, res) => {
  UpdatedProduct.find({ id: { $lte: 1000 } }).select('-styles -features')
  //not sure why its taking so long, I indexed the product id on each document - it took like 40 secs
  .then(allProducts => {
    console.log('🥳🥳🥳🥳🥳 here are your products --->', Object.keys(allProducts))
    res.status(200).send(allProducts);
  })
  .catch(err => {
    console.log('🤬🤬🤬🤬🤬 err getting products --->', err)
    res.status(404).end;
  })
})


app.get("/products/:product_id", (req, res) => {
  UpdatedProduct.findOne({ id: Number(req.params.product_id) }).select('-styles -skus')
    .then(product => {
      console.log('🥳🥳🥳🥳🥳 here is your product --->', product)
      res.status(200).send(product);
    })
    .catch(err => {
      console.log('🤬🤬🤬🤬🤬 err getting products --->', err)
      res.status(404).end;
    })
})



app.listen(port, () => {
  console.log(`The app server is running on port: ${port}!`);
})

