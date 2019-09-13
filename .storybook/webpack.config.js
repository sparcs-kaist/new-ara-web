const path = require('path')

module.exports = {
    module: {
     rules: [
     {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../')
     },
     {  test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: __dirname
     },
     {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[hash].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff'
          }
         }
     },
     {
       test: /\.(ttf|eot|svg|png)$/,
       use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash].[ext]'
          }
       }
     }
   ]
 }
}