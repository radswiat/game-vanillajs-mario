const path = require('path');

const paths = require('../config/webpack/paths');

module.exports = {
  // public path defines root path for all resources like .js,.css
  // this usually is the same for dev and aws but could be different for live
  publicPath: '/',
  // html templates
  // @using HtmlWebpackPlugin
  // html templates defines from where your index.html will be created and how
  // - support for multiple index.html files
  htmlTemplates: [{
    inject: true,
    template: `${paths.appHtmlDir}/index.html`,
    filename: 'index.html',
  }],
  // html minification
  // @using HtmlWebpackPlugin
  // specifies if and how your html will be minified
  // used by HtmlWebpackPlugin
  htmlMinifyOpts: {
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    caseSensitive: true,
    minifyJS: true,
    removeComments: true,
    removeEmptyAttributes: true,
  },
  // copy assets
  // @using CopyWebpackPlugin
  // use webpack to copy some assets for you
  // this usually should not be different across build environments
  assetsCopy: [{
    context: path.resolve('./', 'src/game/assets'),
    from: '**/*.{ico,json,png,jpg,jpeg,svg,js}',
    to: 'assets',
  }, {
    context: path.resolve('./', 'src/game/resources/maps'),
    from: '**/*.{ico,json,png,jpg,jpeg,svg}',
    to: 'maps',
  }, {
    context: path.resolve('./', 'src-server'),
    from: 'package.json',
    to: './',
  }, {
    context: path.resolve('./', 'src-server/.ebextensions'),
    from: '**/*.config',
    to: '.ebextensions',
  }],
  // globals
  // @using webpackDefinePlugin
  // global variables that you can access in react application
  // those are set as global JS variables
  // naming convention of CONSTANT_VARIABLE should be used ( capitalized )
  globals: {
    DEV: false,
    DEMO: true,
    AJAX_ROOT: JSON.stringify('/'),
    SOCKET_URL: JSON.stringify(''),
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  },
};
