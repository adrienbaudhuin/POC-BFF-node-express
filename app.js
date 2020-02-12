const express = require('express');
const app = express();
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const agreements = [
  {
    id: 0,
    content: 'bonjour'
  },
  {
    id: 1,
    content: 'salut'
  }
];

const users = [
  {
    id: 0,
    name: 'Adrien'
  }
];

var agreementSerializer = new JSONAPISerializer('agreements', {
  attributes: ['content', 'id']
});

app.get('/agreements', (req, res) => {
  console.log('ping');
  res.send(agreementSerializer.serialize(agreements));
});

app.get('/agreements/:id', (req, res) => {
  res.send(
    agreementSerializer.serialize(agreements[parseInt(req.params['id'])])
  );
});

app.get('/agreements/:id/users', (req, res) => {});

app.listen(3000);
