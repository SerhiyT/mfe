const { merge } = require('webpack-merge');  // merge - for merge together webpack.config files (commonConfig, devConfig)
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./webpack.common');
const packageJson = require('../package.json')

// ======================================== plugins ===================================

const plugins = () => {
  const configPlugins = [
    new ModuleFederationPlugin({
      name: 'dashboard', // like a global varible when load script loads up inside a container
      filename: 'remoteEntry.js', // Sets the name of the mainfest file. Leave it as 'remoteEntry.js' unless you've got a good reason to change it
      exposes: {
        './DashboardApp': './src/bootstrap', // Aliases filenames
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ];

  return configPlugins;
};

// ======================================== module.exports ===================================

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8083/',
  },
  devServer: {
    port: 8083,
    historyApiFallback: {
      index: 'index.html',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: plugins(),
};

module.exports = merge(commonConfig, devConfig);



