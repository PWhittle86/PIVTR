const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');

app.use(cors());

app.get('/', function(req, res){
  fetch('https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=Technology')
  .then(response => response.json())
  .then(response => {
    res.setHeader('Content-Type', 'application/json');
    res.send(response);
  });
});

app.listen(3001, function(){
  console.log("App running");
});
