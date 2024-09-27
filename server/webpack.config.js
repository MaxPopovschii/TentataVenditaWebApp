const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
module.exports = async (env, options) => {
  const currentEnv = env.env ?? options.mode;
  return {
    target: 'node',
    devtool: currentEnv === 'development' ? 'source-map' : undefined,
    entry: { common: '../common/src/index.ts', server: './src/main.ts' },
    output: {
      path: path.resolve(__dirname, 'dist\server'),
      filename: 'main.js',
    },
    externals: [nodeExternals()],
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          use: {
            loader: 'ts-loader',
          },
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts'],
      alias: {
        common: path.resolve(__dirname, '../common/dist'),
      },
    },
    devServer: {
      hot: true, // Enable HMR in the development server
    },
  };
};
