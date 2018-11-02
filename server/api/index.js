require("dotenv-extended").load();
const { Router } = require("express");
const { json } = require("body-parser");
const mongoose = require("mongoose");
const createModelApi = require("./model");
const models = {
  secretsanta: require("./models/secretsanta"),
};
const boltons = {
  secretsanta: require("./boltons/secretsanta"),
};

mongoose.connect(process.env.MONGO_URI);

module.exports = io => {
  const router = new Router();

  router.use(json());

  Object.entries(models).forEach(([path, model]) => {
    router.use(`/${path}`, createModelApi(model, io, boltons[path]));
  });

  return router;
};
