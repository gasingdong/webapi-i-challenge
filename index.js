const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello from Express');
});

server.get('/api/users', (req, res) => {
  (async () => {
    try {
      const users = await db.find();
      res.status(200).json(users);
    } catch(err) {
      res.status(500).json({ error: "The users information could not be retrieved." });
    }
  })();
});

server.get('/api/users/:id', (req, res) => {
  (async () => {
    try {
      const user = await db.findById(req.params.id);
      user
      ? res.status(200).json(user)
      : res.status(404).json({ message: "The user with the specified ID does not exist." });
    } catch(err) {
      res.status(500).json({ error: "The user information could not be retrieved." });
    }
  })();
});

server.post('/api/users', (req, res) => {
  (async () => {
    try {
      const { name, bio } = req.body;
      const timestamp = Date.now();
      if (name && bio) {
        const newUser = await db.insert({
          name,
          bio,
          created_at: timestamp,
          updated_at: timestamp,
        });
        res.status(201).json(newUser);
      } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
      }
    } catch(err) {
      res.status(500).json({ error: "There was an error while saving the user to the database" });
    }
  })();
});

server.delete('/api/users/:id', (req, res) => {
  (async () => {
    try {
      const user = await db.findById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
      await db.remove(user.id);
      res.status(200).json(user);
    } catch(err) {
      res.status(500).json({ error: "The user could not be removed" });
    }
  })();
});

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000/');
});
