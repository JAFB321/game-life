const path = require('path');
const ResolveTypescriptPlugin = require('resolve-typescript-plugin');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    plugins: [new ResolveTypescriptPlugin()]
  },
  output: {
    filename: 'gamelife.min.js',
    path: path.resolve(__dirname, 'umd'),
    library: {
      type: 'umd',
      name: 'GameLife',
      auxiliaryComment: 'Create new Canvas Game of life',
      umdNamedDefine: true,
      export: 'default'
    },
  },
   mode: 'production',
};