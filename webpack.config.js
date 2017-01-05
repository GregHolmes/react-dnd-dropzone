var path = require('path');
var webpack = require('webpack');

var config = {
    entry: {
        fileUpload: "./js/fileUpload.jsx"
    },
    output: {
        path: path.join(__dirname, "web/js/components"),
        filename: "fileUpload.js",
        publicPath: "js/components/",
        sourceMapFilename: "fileUpload.js.map"
    },
    resolve: {
        modules: [
            path.resolve('./js'),
            'node_modules'
        ],
        extensions: ['.js', '.jsx'],
        enforceExtension: false
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['eslint-loader'],
                include: path.join(__dirname, "js"),
                enforce: 'pre'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: path.join(__dirname, "js"),
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
        ]
    }
};

module.exports = config;
