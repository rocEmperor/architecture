const hotMiddleware = require('webpack-hot-middleware');
const devMiddleware = require('webpack-dev-middleware');
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const serveStatic = require('serve-static');
const config = require('../build/webpack.config.dev');
const compiler = webpack(config);
const port = 7000;

const app = new express();

app.use(serveStatic(path.resolve(__dirname, '../src')));
app.use(devMiddleware(compiler, {
  noInfo: true,
  // 如果false，将会给你列出一大堆无聊的信息。
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}));
app.use(hotMiddleware(compiler));
app.listen(port, () => {
  console.log('server start on 127.0.0.1:7000');
});