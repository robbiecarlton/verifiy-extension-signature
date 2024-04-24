const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const webpack = require('webpack')
const sveltePreprocess = require('svelte-preprocess')
const PACKAGE = require('./package.json')
  
const mode = process.env.NODE_ENV || 'development'
const isProd = mode === 'production'

module.exports = env => ({
  entry: {
    'build/bundle': ['./src/main.ts']
  },
  resolve: {
    alias: {
      svelte: path.dirname(require.resolve('svelte/package.json'))
    },
    conditionNames: ['svelte'],
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    fallback: {
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify") 
    }
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            preprocess: sveltePreprocess(),
            compilerOptions: {
              dev: !isProd
            },
            emitCss: isProd,
            hotReload: !isProd
          }
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.DefinePlugin({
      'process.env':{
        'RESOLVER_URL': JSON.stringify(process.env.RESOLVER_URL),
        'VERSION': `'${PACKAGE.version}'`,
        'CHAPERONE_CONFIG_HAPP_ID': env.happ_id ? `'${env.happ_id}'` : null,
        'CHAPERONE_CONFIG_HOST_URL': env.host_url ? `'${env.host_url}'` : null,
        'CHAPERONE_CONFIG_PRICE_HASH': env.host_price_hash ? `'${env.host_price_hash}'` : null,
        'CHAPERONE_CONFIG_SECURE_WS': env.secure_ws ? env.secure_ws : false,
        'HOLOPORT_CONNECT_TIMEOUT': env.holoport_connect_timeout ? env.holoport_connect_timeout : 30_000,
        'UNUSED_MEMPROOF': isProd ? `"unused"` : `"Failing Joining Code"` // "Failing Joining Code" is used to exercise a chc test, outside of production
      },
    }),
    new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
      const mod = resource.request.replace(/^node:/, "");
      switch (mod) {
          case "crypto":
              resource.request = "crypto";
              break;
          default:
              throw new Error(`Not found ${mod}`);
      }
  }),
    // Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    new webpack.ProvidePlugin({
    Buffer: ['buffer', 'Buffer'],
    })
  ],
  devtool: isProd ? false : 'source-map',
  devServer: {
    hot: true,
    // Redirects localhost:24274/resolve/ to https://resolver.dev.holotest.net/resolve/. Helpful for avoiding CORS issues
    proxy: {
      '/resolve/*': {
        target: 'https://resolver.dev.holotest.net',

        // Needed in order to avoid 403 errors. Copied from https://stackoverflow.com/a/53578166/7246614
        secure: false,
        changeOrigin: true
      }
    },
  },
  experiments: {
    syncWebAssembly: true
  }
})
