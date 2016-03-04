var gulp = require( 'gulp' );
var webpack = require( 'webpack' );
var nodemon = require('nodemon');


var devWebpackConfig = require( './webpack.dev.js' );

gulp.task('build', function(done){
    webpack(devWebpackConfig).run(onBuild(done));
});

gulp.task('watch', function(done){
    return webpack(devWebpackConfig).watch(250, function(err, stats){
        onBuild()(err, stats);
        nodemon.restart();
    });
});

gulp.task('run', ['watch'], function(){
    nodemon({
        execMap: {
            js: 'node'
        },
        script: path.join(__dirname, 'build/app.js'),
        ignore: ['*'],
        watch: ['build'],
        ext: 'noop'
    }).on('restart', function(){
        console.log('-- NodeMon Restart --');
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