const db = require('../config/db');

function addDrink(name, stock, threshold, callback) {
  db.run(
    `INSERT INTO drinks (name, stock, threshold) VALUES (?, ?, ?)`,
    [name, stock, threshold],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    }
  );
}

function getDrinks(callback) {
  db.all(`SELECT * FROM drinks`, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

function updateDrink(id, stock, callback) {
  db.run(
    `UPDATE drinks SET stock = ? WHERE id = ?`,
    [stock, id],
    function (err) {
      if (err) return callback(err);
      callback(null, { id });
    }
  );
}

module.exports = {
  addDrink,
  getDrinks,
  updateDrink
};
