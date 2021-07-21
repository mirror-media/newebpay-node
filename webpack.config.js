//webpack.config.js
const path = require('path')

module.exports = {
    mode: 'development',
    //改為'production'則會自動壓縮檔案
    entry: './index.js',
    //bundle的進入點
    output: {
        path: path.resolve(__dirname, 'dist'),
        //打包後的檔案位置，以此為例會放在名為dist的資料夾
        filename: 'index.bundle.js',
        //打包後的檔案名稱
    },
    module: {
        rules: [
            //所有.js檔都會用Babel編譯
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            //用css loader來處理css檔案
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            //用sass loader來處理sass或scss檔案
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
}
