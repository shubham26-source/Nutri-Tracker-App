const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../calorie_contra.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR NOT NULL UNIQUE,
      email VARCHAR NOT NULL UNIQUE,
      hash VARCHAR NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS food_count (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      food_name VARCHAR NOT NULL,
      calories FLOAT NOT NULL,
      protein FLOAT NOT NULL,
      carbs FLOAT NOT NULL,
      fat FLOAT NOT NULL,
      month INTEGER NOT NULL,
      day INTEGER NOT NULL,
      year INTEGER NOT NULL,
      hour INTEGER NOT NULL,
      minute INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
});

const dbAsync = {
  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  },
  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  all: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};

module.exports = dbAsync;
