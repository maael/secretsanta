const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TSDocgenPlugin = require("react-docgen-typescript-webpack-plugin");

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("awesome-typescript-loader"),
  });
  config.plugins.push(new TSDocgenPlugin());
  config.plugins.push(new ForkTsCheckerWebpackPlugin());
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
