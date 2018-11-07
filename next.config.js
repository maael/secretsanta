require("dotenv-extended").load();
const withPlugins = require("next-compose-plugins");
const withTypescript = require("@zeit/next-typescript");
const nextEnv = require("next-env");

module.exports = withPlugins([nextEnv(), withTypescript()], {
  publicRuntimeConfig: {
    AUTH0_CLIENT_ID: JSON.stringify(process.env.AUTH0_CLIENT_ID),
    AUTH0_CLIENT_DOMAIN: JSON.stringify(process.env.AUTH0_DOMAIN),
  },
  serverRuntimeConfig: {
    AUTH0_SECRET: JSON.stringify(process.env.AUTH0_SECRET),
  },
});
