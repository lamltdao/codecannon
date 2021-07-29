process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')
const ESLintPlugin = require('eslint-webpack-plugin');
const config = environment.toWebpackConfig()

module.exports = {
  ...config,
  plugins: [...config.plugins, new ESLintPlugin()],
};
