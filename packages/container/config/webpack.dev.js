const { merge } = require('webpack-merge');  // merge - for merge together webpack.config files (commonConfig, devConfig)
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")

const commonConfig = require('./webpack.common');
const packageJson = require('../package.json')

// ======================================== plugins ===================================

const plugins = () => {
  const configPlugins = [
    new ModuleFederationPlugin({
      name: 'container', // Not used. Only needed for Remotes
      remotes: {  // Lists projects that the Container can search to fet additional code / key's are names of diff modules 
        // marketing in brackets related to the 'name' property in the Marketing webpack.config.js (Marketing)
        // @http://localhost:8081/remoteEntry.js - URL for the remoteEntry file (marketing)
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
      },
      shared: packageJson.dependencies,
    }),
  ];

  return configPlugins;
};

// ======================================== module.exports ===================================

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: plugins(),
};

module.exports = merge(commonConfig, devConfig);



