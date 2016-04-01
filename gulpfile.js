'use strict';
let gulp = require( 'gulp' );
let webpack = require( 'webpack' );
let nodemon = require('nodemon');
let devWebpackConfig = require( './webpack.dev.js' );

gulp.task('frontend-build', webpackRun(devWebpackConfig.frontend));
gulp.task('backend-build', webpackRun(devWebpackConfig.backend));

gulp.task('backend-watch', webpackWatch(devWebpackConfig.backend));
gulp.task('frontend-watch', webpackWatch(devWebpackConfig.frontend))

gulp.task('run', ['backend-watch', 'frontend-watch'], () =>{
    nodemon({
        execMap: {
            js: 'node'
        },
        script: 'build/app.js',
        ignore: ['*'],
        watch: [],
        ext: 'noop'
    }).on('start',function(){
        console.log('Watching files');
    }).on('restart', function(){
        console.log('-- Nodemon Restart --');
    })
});

gulp.task('default', ['build']);

function onBuild( done ) {
    return function ( err, stats ) {
        if ( err ) {
            console.log( 'Error', err );
        }
        else {
            console.log( stats.toString() );
        }
        if ( done ) {
            done();
        }
    };
}

function webpackWatch(config) {
    return function (done) {
        var fired = false;
        webpack(config).watch({
            aggregateTimeout: 250
        }, function (err, stats) {
            if (!fired) {
                fired = true;
                onBuild(done)(err, stats);
            }
            nodemon.restart();
        });
    }
}

function webpackRun(config){
    return function (done){
        webpack(config).run(onBuild(done));
    }
}