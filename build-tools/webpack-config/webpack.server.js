import path from 'path';

import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

// local modules, helpers, configs
import paths from '../config/webpack/paths';

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  // context: cssModulesConfig.context,
  // devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    path.resolve(process.cwd(), 'src-server/server.js'),
  ],
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // virtual path to file that is served by WebpackDevServer in development.
    // filename: 'static/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
  },
  // resolve
  // @partial
  resolve: {
    extensions: [
      '.web.js', '.js', '.json', '.web.jsx', '.jsx', '.eot',
      '.svg', '.woff2', '.woff', '.tff', '.css', '.scss', '.png',
    ],
  },
  // An array of Rules which are matched to requests when modules are created.
  // These rules can modify how the module is created.
  // They can apply loaders to the module, or modify the parser.
  module: {
    // strictExportPresence: true,
    rules: [
      {
        // "oneOf" will traverse all following loaders until one will match
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // Process JS with Babel.
          {
            test: /\.(js)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                'env',
                'stage-2',
              ],
            },
          },
        ],
      },
      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "Fallback file loader" loader.
    ],
  },
  plugins: [
    new CleanWebpackPlugin(paths.appBuild, { allowExternal: true }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ],
};
