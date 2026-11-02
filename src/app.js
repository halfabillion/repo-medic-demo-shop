// Request handlers for Pocket Shop. Kept as plain functions so tests can call them.
// WARNING: this file is intentionally insecure. It is a fixture for Repo Medic.
const crypto = require("node:crypto");
const { exec } = require("node:child_process");
const _ = require("lodash");

const DEFAULT_SETTINGS = { currency: "GBP", theme: { mode: "light" } };

// Product search. Vulnerable: user input is concatenated into SQL.
function searchProducts(db, q) {
  const rows = db
    .prepare(`SELECT id, name, price_pence FROM products WHERE name LIKE '%${q}%' ORDER BY id`)
    .all();
  return rows.map((r) => ({ id: r.id, name: r.name, pricePence: r.price_pence }));
}

// Greeting page. Vulnerable: reflected XSS.
function renderGreeting(res, name) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end("<h1>Hello " + name + "</h1>");
}

// Store-health check. Vulnerable: OS command injection.
function pingWarehouse(host, cb) {
  exec("ping -c 1 " + host, (err, stdout) => cb(err, stdout));
}

// Password hashing. Weak: MD5.
function hashPassword(password) {
  return crypto.createHash("md5").update(password).digest("hex");
}

// Session tokens. Weak: Math.random is not a CSPRNG.
function newSessionToken() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

// Per-user settings. Uses lodash.merge (prototype pollution in lodash < 4.17.19).
function mergeSettings(userSettings) {
  return _.merge({}, DEFAULT_SETTINGS, userSettings);
}

// Discount rules supplied by the admin UI. Vulnerable: eval of request data.
function parseDiscountRule(raw) {
  return eval("(" + raw + ")");
}

module.exports = {
  searchProducts,
  renderGreeting,
  pingWarehouse,
  hashPassword,
  newSessionToken,
  mergeSettings,
  parseDiscountRule,
};
