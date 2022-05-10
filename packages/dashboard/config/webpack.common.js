const { VueLoaderPlugin } = require('vue-loader');

// ======================================== babelOptions ===================================

const babelOptions = (preset) => {
  const opts = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-transform-runtime'],
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

// ======================================== plugins ===================================

const plugins = () => {
  const configPlugins = [new VueLoaderPlugin()];

  return configPlugins;
};

// ======================================== module.exports ===================================

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
        use: [{ loader: 'file-loader' }],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.scss|\.css$/,
        use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader'],
      },
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
