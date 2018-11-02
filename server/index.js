require("dotenv-extended").load();
const qs = require("querystring");
const next = require("next");
const express = require("express");
const api = require("./api");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
  console.info("connected!");
  socket.on("room", room => {
    console.info("joining room", room);
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
      new Promise((resolve, reject) => {
        app.use("/api", api(io));

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
