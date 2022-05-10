const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

// ======================================== plugins ===================================

const plugins = () => {
  const configPlugins = [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js', // Sets the name of the mainfest file. Leave it as 'remoteEntry.js' unless you've got a good reason to change it
      exposes: {
        './DashboardApp': './src/bootstrap', // Aliases filenames
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
    publicPath: '/dashboard/latest/',
  },
  plugins: plugins(),
};

module.exports = merge(commonConfig, prodConfig);
