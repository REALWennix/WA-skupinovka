const bcrypt = require('bcrypt');
const db = require('../config/db');

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

function addUser(username, email, hashedPassword, callback) {
  db.run(
    `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [username, email, hashedPassword],
    callback
  );
}

function getUserByUsernameOrEmail(usernameOrEmail, callback) {
  db.get(
    `SELECT * FROM users WHERE username = ? OR email = ?`,
    [usernameOrEmail, usernameOrEmail],
    callback
  );
}

module.exports = {
  hashPassword,
  comparePassword,
  addUser,
  getUserByUsernameOrEmail
};
