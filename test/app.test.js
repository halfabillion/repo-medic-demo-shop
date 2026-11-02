const test = require("node:test");
const assert = require("node:assert/strict");
const { openDb } = require("../src/db");
const app = require("../src/app");

function fakeRes() {
  return {
    headers: {},
    body: "",
    setHeader(k, v) { this.headers[k.toLowerCase()] = v; },
    end(b) { this.body = b; },
  };
}

test("search finds products by partial name", () => {
  const db = openDb();
  const names = app.searchProducts(db, "Tea").map((p) => p.name);
  assert.deepEqual(names, ["Teapot", "Tea towel", "Teacup set"]);
});

test("search returns nothing for unknown names", () => {
  assert.deepEqual(app.searchProducts(openDb(), "Spaceship"), []);
});

test("greeting renders the visitor name", () => {
  const res = fakeRes();
  app.renderGreeting(res, "Ali");
  assert.match(res.body, /Hello Ali/);
  assert.match(res.headers["content-type"], /text\/html/);
});

test("password hashes are deterministic hex", () => {
  assert.equal(app.hashPassword("pw"), app.hashPassword("pw"));
  assert.match(app.hashPassword("pw"), /^[0-9a-f]+$/);
});

test("session tokens are long and unique", () => {
  const a = app.newSessionToken();
  const b = app.newSessionToken();
  assert.notEqual(a, b);
  assert.ok(a.length >= 16);
});

test("settings merge keeps defaults", () => {
  const s = app.mergeSettings({ theme: { mode: "dark" } });
  assert.equal(s.currency, "GBP");
  assert.equal(s.theme.mode, "dark");
});

test("discount rules parse object literals", () => {
  assert.deepEqual(app.parseDiscountRule('{"code":"TEA10","percent":10}'), { code: "TEA10", percent: 10 });
});
