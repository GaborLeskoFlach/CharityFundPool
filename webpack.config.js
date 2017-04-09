"use strict";
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var process = require("process");


console.log(process["NODE_ENV"])


module.exports = {
    entry: [
        './src/app.tsx'
    ],

    output: {
        filename: 'bundle.js'
    },
    devtool: 'source-map',

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['babel'] },
            { test: /\.tsx?$/, exclude: /(node_modules)/, loader:  'ts-loader' },
            { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" },
            { test: /\.json$/, loader: 'json' }
        ]
    },
    postcss: function () {
        return [precss, autoprefixer];
    },
    externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window'
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        contentBase: './'
    }
}