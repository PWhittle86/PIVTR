const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const publicPath = path.join(__dirname, '../client/public');

app.use(cors());
app.use(parser.json());
app.use(express.static('client/build'));
app.use(parser.urlencoded({extended: true}));

let url = 'mongodb://heroku_pxbjnrdv:password1@ds237832.mlab.com:37832/heroku_pxbjnrdv'|| 'mongodb://localhost:27017';
let port = process.env.PORT || 3000;

MongoClient.connect(url { useNewUrlParser: true }, function(error, client){

  const db = client.db("heroku_pxbjnrdv");
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
      } else {
        console.log('saved to database');
        res.status(201);
        res.json(result.ops[0]); // result object > operations property
      }
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
        // if epic appears in the favorite collection
        // add 'favorite' field to aggregated object
        db.collection('favorites').find().toArray((error, favorites) => {
          if(error) {
            console.log(error);
          } else {
            data.forEach((item) => {
              const isFavorite = favorites.some(fav => fav.epic === item._id);
              if(isFavorite) item.favorite = true;
            });
            data = data.sort((a,b) => a.count - b.count);
            const convertedResult = convertMongoGroupToStockObject(data);
            res.json(convertedResult);
          }
        })
      }
    });
  });

  // get all stock for one EPIC code
  app.get('/stocks/:epic', function(req, res) {
    const stocksCollection = db.collection('stocks');
    const epicCode = req.params.epic;
    const filterObject = {epic: epicCode};

    stocksCollection.find(filterObject).toArray((err, result) => {
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      } else {
        res.status(200);
        res.json(result);
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
        avgPrice: data.avgPrice,
        favorite: data.favorite ? true : false
      }
    });
  }

  //delete specified stock based on EPIC key and NUMBER of stocks to delete
  app.delete('/stocks/:epic/:numberToSell', function(req, res){
    const epicCode = req.params.epic;
    const numberToSell = parseInt(req.params.numberToSell);
    const stocksToRemove = db.collection('stocks')
      .find({epic: epicCode})
      .limit(numberToSell)
      .toArray((error, data) => {
        if(error){
          console.log(error);
        } else {
          const ids = data.map(stock => stock._id);
          db.collection('stocks').deleteMany({ _id: { $in: ids }}, (err, data) => {
            if(err) {
              console.log(error);
            } else {
              res.status(200);
              res.send(data);
            }
          });
        }
      });
  });

  // FAVOURITES

  app.get('/favorites', (req, res) => {
        db.collection('favorites').find().toArray((error, data) => {
          if(error) {
            console.log(error);
            res.status(500);
            res.send([]);
          } else {
            res.status(200);
            res.send(JSON.stringify(data));
          }
        })
      });

    app.post('/favorites', (req, res) => {
      const epic = req.body;
      console.log(epic);
      db.collection('favorites').insertOne(epic, (error, data) => {
        if(error) {
          console.log(error);
          res.status(500);
          res.send(error);
        } else {
          // console.log(data);
          res.status(200);
          res.send(epic);
        }
      })
    });

    app.delete('/favorites/:epic', (req, res) => {
      const epic = req.params.epic;
      console.log("delete", epic);
      db.collection('favorites').deleteMany({epic: epic}, (error, data) => {
        if(error) {
          console.log(error);
          res.status(500);
          res.send(error);
        } else {
          // console.log(data);
          res.status(200);
          res.send(epic);
        }
      })
    });



app.listen(3001, function(){
  console.log("App running");
});

});
