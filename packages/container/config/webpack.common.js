const HtmlWebpackPlugin = require('html-webpack-plugin');

// ======================================== babelOptions ===================================

const babelOptions = (preset) => {
  const opts = {
    presets: ['@babel/preset-react', '@babel/preset-env'],
    plugins: ['@babel/plugin-transform-runtime'],
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

// ======================================== plugins ===================================

const plugins = () => {
  const configPlugins = [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ];

  return configPlugins;
};

// ======================================== module.exports ===================================

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions(),
        },
      },
    ],
  },
  plugins: plugins(),
};
