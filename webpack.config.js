import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ?  'source-map' : false;

const pages = ['index', 'privacy'];

const moduleConfig = {
  mode,
  entry: pages.reduce((config, page) => {
    config[page] = `/src/js/${page}.js`;
    return config;
  }, {}),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
    assetModuleFilename: 'assets/[name][ext]',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devtool,
  target,
  devServer: {
    port: 5000,
    open: true,
    hot: true,
    // compress: true,
    // historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                  ],
                ],
              },
            },
          },
          'sass-loader'
        ],
      },
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              },
            }
          }
        ],
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    ...pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          filename: `${page}.html`,
          template: `/src/pages/${page}.html`,
          chunks: [page],
        })
    ),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
};

export default moduleConfig;
