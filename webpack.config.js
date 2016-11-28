var path = require('path');

module.exports = {

    entry: path.join(__dirname, "dist", "index"),
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, "bundle"),
        filename: 'index.js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: "@awayjs/core"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `awesome-typescript-loader`
            { test: /\.ts(x?)$/, use: require.resolve('awesome-typescript-loader')},
            // all files with a `.js` or `.jsx` extension will be handled by babel-loader
            { test: /\.js(x?)$/, use: require.resolve('babel-loader')}
        ]
    }
};