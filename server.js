const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, function (error, client) {

  const db = client.db("stockdb");
  console.log("Connected to db");

  app.get('/', function(req, res){
    fetch('https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=Technology')
    .then(response => response.json())
    .then(response => {
      res.setHeader('Content-Type', 'application/json');
      res.send(response);
    });
  });

  app.get('/quote', function(req, res) {
    const symbol = req.query.symbol;
    fetch(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)
    .then(response => response.json())
    .then(response => {
      res.setHeader('Content-Type', 'application/json');
      res.send(response);
    });
  });

  app.post('/stocks', function(req, res) {
      console.log("stocks called");
      const stocksCollection = db.collection('stocks');
      const stockToSave = req.body;
      stocksCollection.save(stockToSave, function (error, result) {
        if(error){
          console.log(error);
          res.status(500);
          res.send();
        }
        console.log('saved to database');
        res.status(201);
        res.json(result.ops[0]); // result object > operations property
    });
  });

  // get stocks
  app.get('/stocks', function(req, res) {
    const stockCollection = db.collection('stocks');
    stockCollection.find().toArray(function(error, allStocks) {
      if(error){
        console.log(error);
        res.status(500);
        res.send();
      }
      res.json(allStocks);
    });
  });

  app.listen(3001, function(){
    console.log("App running");
  });

});
