const express = require('express');
const db = require('./data/db');

const server = express();

server.get('/', (req, res) => {
  res.send('Hello from Express');
});

server.get('/api/users', (req, res) => {
  (async () => {
    try {
      const users = await db.find();
      res.status(200).json(users);
    } catch(err) {
      res.status(500).send({ error: "Something failed!" })
    }
  })();
})

server.get('/api/users/:id', (req, res) => {
  (async () => {
    try {
      const user = await db.findById(req.params.id);
      res.status(200).json(user);
    } catch(err) {
      res.status(500).send({ error: "Something failed!" })
    }
  })();
})

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000/');
});
