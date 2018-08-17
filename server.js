const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');

app.use(cors());

app.get('/', function(req, res){
  fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=8M3NUU7VZCUC7VCD')
  .then(response => response.json())
  .then(response => {
    res.setHeader('Content-Type', 'application/json');
    res.send(response.results);
  });
});

app.listen(3001, function(){
  console.log("App running");
});
