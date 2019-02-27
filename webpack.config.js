const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');

module.exports = {
    entry: ['./src/js/app.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|ico|svg)$/,
                use: 'file-loader?name=./asset/image/[name].[ext]'
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: {
            index: '/'
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            favicon: './src/asset/image/favicon.ico'
        }),
        new EnvironmentPlugin()
    ]
};