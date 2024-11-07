const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.sqlite', (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the SQLite database');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS qrcodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      user_id INTEGER, 
      url TEXT UNIQUE, 
      expiration DATETIME, 
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS drinks (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      name TEXT UNIQUE, 
      stock INTEGER CHECK(stock >= 0), 
      threshold INTEGER CHECK(threshold >= 0)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS drink_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      user_id INTEGER, 
      drink_id INTEGER, 
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, 
      FOREIGN KEY(user_id) REFERENCES users(id), 
      FOREIGN KEY(drink_id) REFERENCES drinks(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      description TEXT, 
      assigned_to INTEGER, 
      completed BOOLEAN DEFAULT 0, 
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
      FOREIGN KEY(assigned_to) REFERENCES users(id)
    )
  `);

  db.run(`
    INSERT OR IGNORE INTO drinks (name, stock, threshold)
    VALUES 
      ('Espresso', 50, 5),
      ('Latte', 30, 5),
      ('Cappuccino', 40, 10),
      ('Americano', 60, 10),
      ('Mocha', 20, 3)
  `);
  
});



module.exports = db;
