const withTypescript = require("@zeit/next-typescript");
const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

const c = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

    return config;
  }
};

module.exports = withTypescript(c);
