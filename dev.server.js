import express from 'express';
import webpack from 'webpack';
import opn from 'opn';
import path from 'path';
import ora from 'ora';
import webpackConfig from './webpack.config';

const port = process.env.PORT || 8000;

let spinner = ora('服务开始启动...')
spinner.start();

let app = express();
webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n');
});

app.use(require('connect-history-api-fallback')());

let staticPath = path.posix.join(path.resolve(__dirname, '.dist'), 'static')
app.use(express.static('.dist/static'))

export default app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    let uri = 'http://localhost:' + port
    console.log('Listening at ' + uri + '\n')
    opn(uri)
});