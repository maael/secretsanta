require("dotenv-extended").load();
const qs = require("querystring");
const next = require("next");
const express = require("express");
const pino = require("express-pino-logger")();
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const api = require("./api");

io.on("connection", socket => {
  socket.on("room", room => {
    socket.join(room);
  });
});

const DEV = process.env.NODE_ENV === "development";

const nextApp = next({
  dir: ".",
  dev: DEV,
});

function handleWithParam(app, method, handler, path, page) {
  return app[method](path, (req, res) => {
    const newQuery = qs.stringify({ ...req.query, ...req.params });
    req.url = `${page}?${newQuery}`;
    return handler(req, res, req.url);
  });
}

nextApp
  .prepare()
  .then(
    () =>
      new Promise(async (resolve, reject) => {
        app.use(pino);
        app.use("/api", await api(io));

        const handler = nextApp.getRequestHandler();

        handleWithParam(app, "get", handler, "/secret/:id", "/secret/room");

        app.all("*", handler);

        try {
          server.listen(process.env.PORT);
          resolve();
        } catch (e) {
          reject(e);
        }
      }),
  )
  .then(() => {
    console.log(`> ${process.env.SERVER_URL}`);
  })
  .catch(err => console.error("Error starting server", err));
