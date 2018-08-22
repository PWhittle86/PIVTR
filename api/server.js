const express = require('express');
const parser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');

app.use(cors());
app.use(express.static('client/build'));
app.use(parser.urlencoded({entended: true}));
app.use(parser.json());
