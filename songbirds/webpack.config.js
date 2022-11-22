const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
     entry: {
      main: './assets/js/index.js',
     },
     output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
     },
     plugins: [
      new HTMLWebpackPlugin({
         title: 'Song Birds',
         template: './index.html',
      })
   ],

   module: {
      rules: [
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(jpg|svg|gif|png|mp3)$/,
            use: ['file-loader']
         }
      ]
   },
   devServer: {
      static: {
          directory: path.join(__dirname),
      },
      compress: true,
      port: 9000,
      open: true,
  },

}