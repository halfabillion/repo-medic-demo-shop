const http = require("node:http");
const { openDb } = require("./db");
const { config } = require("./config");
const app = require("./app");

const db = openDb();

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname === "/search") {
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(app.searchProducts(db, url.searchParams.get("q") || "")));
  }
  if (url.pathname === "/hello") {
    return app.renderGreeting(res, url.searchParams.get("name") || "friend");
  }
  if (url.pathname === "/health/warehouse") {
    return app.pingWarehouse(url.searchParams.get("host") || "localhost", (err, out) => {
      res.end(err ? "down" : out);
    });
  }
  res.statusCode = 404;
  res.end("not found");
});

if (require.main === module) {
  server.listen(config.port, () => console.log(`Pocket Shop on :${config.port}`));
}

module.exports = { server };
