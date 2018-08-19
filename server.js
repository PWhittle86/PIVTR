const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(parser.json());
app.use(express.static('client/build'));
app.use(parser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, function(error, client){

  const db = client.db("stockdb");
  console.log("Connected to db");

  //IEX API CALLS

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
      }).catch(error => console.log('Stock not found:', error.message));
    });

  //DATABASE CALLS

  // post a new line of stock in the user's portfolio

  app.post('/stocks', function(req, res) {
    const stocksCollection = db.collection('stocks');
    const stockToSave = req.body;
    stocksCollection.insertOne(stockToSave, function (error, result) { // .save() is deprecated
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

  // get all stocks
  app.get('/stocks', function(req, res) {
    const stocksCollection = db.collection('stocks');
    stocksCollection.aggregate([
      {
        $group: {
          _id: "$epic",
          name: { $first: "$name" },
          count: { $sum:1 },
          avgChange: { $avg: "$change" },
          avgPrice: { $avg: "$price" }
        }
      }
    ]).get((error, data) => {
      if(error) {
        console.log(error);
        res.status(500);
        res.send();
      } else {
        const convertedResult = convertMongoGroupToStockObject(data);
        res.json(convertedResult);
      }
    });
  });

  convertMongoGroupToStockObject = (aggregateData) => {
    return aggregateData.map(data => {
      return {
        epic: data['_id'],
        name: data.name,
        count: data.count,
        avgChange: data.avgChange,
        avgPrice: data.avgPrice
      }
    })
  }

  //update specified stock
  app.put('/stocks/:id', function(req, res){
    console.log("stock updated");
    const stocksCollection = db.collection('stocks');
    const stockID = ObjectID(req.params.id);
    const filterObject = {_id: stockID};
    const updatedData = req.body;

    stocksCollection.update(filterObject, updatedData, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send;
      }
      res.status(200);
      res.json(result);
      res.send;
    });
  });

  //delete all stocks
  app.delete('/stocks', function(req, res){
    console.log("All stocks deleted");
    const filterObject = {};
    const stocksCollection = db.collection('stocks');
    stocksCollection.deleteMany(filterObject, function(err, result){
      if(err){
        res.status(500);
        res.send();
      }
      res.status(204);
      res.send();
    })
  })

  //delete specified stock
  app.delete('/stocks/:id', function (req, res){
    const stocksCollection = db.collection('stocks');
    const stockID = ObjectID(req.params.id);
    const filterObject = {_id: stockID};

    stocksCollection.deleteOne(filterObject, function(err, result){
      if(err){
        res.status(500);
        res.send();
      }
      res.status(200);
      res.json(result);
    });
  });

app.listen(3001, function(){
  console.log("App running");
});

});
