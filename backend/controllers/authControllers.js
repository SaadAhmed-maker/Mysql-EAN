// authControllers.js
const db = require('../config/db');

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).send({ message: 'Server error', error: err.message });
    }
    if (result.length === 0) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    res.send({ message: 'Login successful', user: result[0] });
  });
};

exports.signup = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  // Check if user already exists
  const checkSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkSql, [email], (err, result) => {
    if (err) {
      return res.status(500).send({ message: 'Server error', error: err.message });
    }
    if (result.length > 0) {
      return res.status(409).send({ message: 'User already exists' });
    }

    // Insert user
    const insertSql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(insertSql, [email, password], (err, result) => {
      if (err) {
        return res.status(500).send({ message: 'Error creating user', error: err.message });
      }
      res.status(201).send({ message: 'User registered successfully' });
    });
  });
};
