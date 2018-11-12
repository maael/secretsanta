require("dotenv-extended").load();
const { Router } = require("express");
const { json } = require("body-parser");
const mongoose = require("mongoose");
const startAgenda = require("./agenda");
const { userMiddleware } = require("./middleware");
const createModelApi = require("./model");
const models = {
  secretsanta: {
    model: require("./models/secretsanta"),
    bolton: require("./boltons/secretsanta"),
    hooks: require("./hooks/secretsanta"),
  },
};

mongoose.connect(process.env.MONGO_URI);

module.exports = async io => {
  const router = new Router();
  const agenda = await startAgenda();

  router.use(json());
  router.use(userMiddleware);

  Object.entries(models).forEach(([path, { model, bolton, hooks }]) => {
    router.use(
      `/${path}`,
      createModelApi(model, io, { bolton, hooks, agenda }),
    );
  });

  return router;
};
