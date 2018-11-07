require("dotenv-extended").load();
const { Router } = require("express");
const { json } = require("body-parser");
const mongoose = require("mongoose");
const { userMiddleware } = require("./middleware");
const createModelApi = require("./model");
const models = {
  secretsanta: {
    model: require("./models/secretsanta"),
    bolton: require("./boltons/secretsanta"),
  },
};

mongoose.connect(process.env.MONGO_URI);

module.exports = io => {
  const router = new Router();

  router.use(json());
  router.use(userMiddleware);

  Object.entries(models).forEach(([path, { model, bolton }]) => {
    router.use(`/${path}`, createModelApi(model, io, { bolton }));
  });

  return router;
};
