const config = require('./webpack.config.base');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

/*
 * mode = 'production'，会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin,
 * ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
 * */
config.mode = 'production';
config.module.rules = [
  {
    test: /(\.jsx|\.js)$/,
    use: {
      loader: "babel-loader"
    },
    exclude: /node_modules/
  }, {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: ["css-loader", "postcss-loader"],
      publicPath: '../' // 正常情况下打包css文件，里面的图片路径会相对与当前打包下的文件夹，导致图片资源引用出错，设置publicPath可以改变资源路径
    })
  }, {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: ["css-loader", "less-loader", "postcss-loader"],
      publicPath: '../' // 正常情况下打包css文件，里面的图片路径会相对与当前打包下的文件夹，导致图片资源引用出错，设置publicPath可以改变资源路径
    })
  }, {
    test: /\.(png|jpg|gif)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
          outputPath: "images/",
          name: '[name]-[hash:8].[ext]'
        }
      },
      {
        loader: 'image-webpack-loader' // 压缩图片
      }
    ]
  }
]
config.plugins.push(new ExtractTextPlugin("css/[name]-[hash:8].css")); // 提取css文件
config.plugins.push(new optimizeCss()); // 压缩css文件

module.exports = config;