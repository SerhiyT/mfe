const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

// ======================================== plugins ===================================

const plugins = () => {
  const configPlugins = [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js', // Sets the name of the mainfest file. Leave it as 'remoteEntry.js' unless you've got a good reason to change it
      exposes: {
        './MarketingApp': './src/bootstrap', // Aliases filenames
      },
      shared: packageJson.dependencies,
    }),
  ];

  return configPlugins;
};

// ======================================== module.exports ===================================

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/marketing/latest/',
  },
  plugins: plugins(),
};

module.exports = merge(commonConfig, prodConfig);
