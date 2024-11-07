const db = require('../config/db');

function addTask(description, assignedTo, callback) {
  db.run(
    `INSERT INTO tasks (description, assigned_to) VALUES (?, ?)`,
    [description, assignedTo],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    }
  );
}

function getTasks(callback) {
  db.all(`SELECT * FROM tasks`, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

module.exports = {
  addTask,
  getTasks
};
