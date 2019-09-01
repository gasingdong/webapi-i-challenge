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
      res.status(500).send({ error: "The users information could not be retrieved." })
    }
  })();
})

server.get('/api/users/:id', (req, res) => {
  (async () => {
    try {
      const user = await db.findById(req.params.id);
      user
      ? res.status(200).json(user)
      : res.status(404).send({ message: "The user with the specified ID does not exist." });
    } catch(err) {
      res.status(500).send({ error: "The user information could not be retrieved." })
    }
  })();
})

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000/');
});
