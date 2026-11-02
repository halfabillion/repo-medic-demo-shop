// In-memory product catalogue (node:sqlite is built into Node >= 22.5).
const { DatabaseSync } = require("node:sqlite");

function openDb() {
  const db = new DatabaseSync(":memory:");
  db.exec(`
    CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price_pence INTEGER NOT NULL);
    CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT NOT NULL, password_hash TEXT NOT NULL);
    INSERT INTO products (name, price_pence) VALUES
      ('Teapot', 1999), ('Tea towel', 499), ('Teacup set', 2450), ('Kettle', 3599);
    INSERT INTO users (email, password_hash) VALUES ('admin@pocket.shop', 'x');
  `);
  return db;
}

module.exports = { openDb };
