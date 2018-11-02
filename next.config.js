const withPlugins = require("next-compose-plugins");
const withTypescript = require("@zeit/next-typescript");
const nextEnv = require("next-env");

module.exports = withPlugins([nextEnv(), withTypescript()]);
