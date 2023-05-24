const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user-routes');

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@nodejs01-mongo.eg2g7ue.mongodb.net/${process.env.MONGODB_DEFAULT_DATABASE}?retryWrites=true&w=majority`;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(userRoutes);

app.use((err, req, res, next) => {
  let code = 500;
  let message = 'Something went wrong.';
  if (err.code) {
    code = err.code;
  }

  if (err.message) {
    message = err.message;
  }
  res.status(code).json({ message: message });
});

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log('COULD NOT CONNECT TO MONGODB!');
    } else {
      app.listen(3000);
    }
  }
);
