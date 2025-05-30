
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

exports.signup = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  const checkSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkSql, [email], (err, result) => {
    if (err) return res.status(500).send({ message: 'Server error', error: err.message });
    if (result.length > 0) return res.status(409).send({ message: 'User already exists' });

    const hashedPassword = bcrypt.hashSync(password, 10);

    const insertSql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(insertSql, [email, hashedPassword], (err, insertResult) => {
      if (err) return res.status(500).send({ message: 'Error creating user', error: err.message });
      const userId = insertResult.insertId;
      const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      res.status(201).send({
        message: 'User registered successfully',
        token,
        user: { id: userId, email },
        status: 'success'
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).send({ message: 'Server error', error: err.message });
    if (result.length === 0) return res.status(401).send({ message: 'Invalid credentials' });

    const user = result[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.send({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email },
      status: 'success'
    });
  });
};
