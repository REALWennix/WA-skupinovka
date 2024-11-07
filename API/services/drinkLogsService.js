const db = require('../config/db');

function addDrinkLog(userId, drinkId, callback) {
  db.run(
    `INSERT INTO drink_logs (user_id, drink_id) VALUES (?, ?)`,
    [userId, drinkId],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    }
  );
}

function getAllDrinkLogs(callback) {
  db.all(`SELECT * FROM drink_logs`, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

function getDrinkLogsByTimeRange(startDate, endDate, callback) {
  db.all(
    `SELECT * FROM drink_logs WHERE timestamp BETWEEN ? AND ?`,
    [startDate, endDate],
    (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    }
  );
}

function addMultipleDrinkLogs(userId, drinkIds, callback) {
    const placeholders = drinkIds.map(() => "(?, ?)").join(", ");
    const values = drinkIds.flatMap(drinkId => [userId, drinkId]);
  
    const query = `INSERT INTO drink_logs (user_id, drink_id) VALUES ${placeholders}`;
  
    db.run(query, values, function (err) {
      if (err) return callback(err);
      callback(null, { insertedRows: this.changes });
    });
  }

module.exports = {
  addDrinkLog,
  addMultipleDrinkLogs,
  getAllDrinkLogs,
  getDrinkLogsByTimeRange
};
