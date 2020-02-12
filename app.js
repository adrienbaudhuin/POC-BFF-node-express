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
    id: '0',
    content: 'bonjour',
    users: [
      {
        id: '0',
        name: 'Adrien'
      },
      {
        id: '1',
        name: 'Adrien2'
      }
    ]
  },
  {
    id: '1',
    content: 'salut',
    users: [
      {
        id: '2',
        name: 'Adrien3'
      }
    ]
  },
  {
    id: '2',
    content: 'yo',
    users: [
      {
        id: '0',
        name: 'Adrien'
      }
    ]
  }
];

const users = [
  {
    id: '0',
    name: 'Adrien',
    agreements: [
      {
        id: '0',
        content: 'bonjour'
      },
      {
        id: '2',
        content: 'yo'
      }
    ]
  },
  {
    id: '1',
    name: 'Adrien2',
    agreements: [
      {
        id: '0',
        content: 'bonjour'
      }
    ]
  },
  {
    id: '2',
    name: 'Adrien3',
    agreements: [
      {
        id: '1',
        content: 'salut'
      }
    ]
  }
];

var agreementSerializer = new JSONAPISerializer('agreement', {
  attributes: ['content', 'users'],
  users: {
    ref: 'id',
    attributes: ['name']
  }
});

var userSerializer = new JSONAPISerializer('user', {
  attributes: ['name', 'agreements'],
  agreements: {
    ref: 'id',
    included: false,
    attributes: ['content']
  }
});

app.get('/agreements', (req, res) => {
  res.send(agreementSerializer.serialize(agreements));
});

app.get('/agreements/:id', (req, res) => {
  res.send(
    agreementSerializer.serialize(agreements[parseInt(req.params['id'])])
  );
});

app.get('/users', (req, res) => {
  res.send(userSerializer.serialize(users));
});

app.get('/users/:id', (req, res) => {
  res.send(userSerializer.serialize(users[parseInt(req.params['id'])]));
});

app.listen(3000);
