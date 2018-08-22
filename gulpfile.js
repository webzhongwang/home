var gulp = require('gulp'),
	concat = require('gulp-concat'),
	minifyCSS = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	replace = require('gulp-replace'), 
	through = require('through2'),
	Q = require('q'),
	gulpSequence = require('gulp-sequence'),
	childProcess = require('child_process'),
	exec = Q.nbind(childProcess.exec),
	moment = require('moment'),
	gutil = require('gulp-util'),
	scp = require('gulp-scp2'),
    // rev = require('gulp-rev'),
    webserver = require('gulp-webserver'),
    fs = require('fs');

gulp.task('default', function(){
	console.log('gulp start');
});

// 本地服务器
gulp.task('webserver', function(){
    gulp.src('./src')
        .pipe(webserver({
            port: 8001,
            host: 'abc.com',
            // open: 'index.html',
            livereload: true,
            directoryListing: {
                enable: true,
                path: './src'
            },
            proxies: [
                { source: '/i', target: 'http://123.65.1.1' + '/i' },
            ]
        }))
});


gulp.task('clean', function() {
    
    var q1 = new Promise(function(resolve) {
        exec('rm -rf dist/', function(error, stdout, stderr){
            console.log( now(), gutil.colors.yellow('rm -rf dist') );
            resolve();
        });
    })

    return Promise.all([q1])
});
// create version
gulp.task('version', function() {
    
    var q1 = new Promise(function(resolve) {
        version = new Date().getTime()
        resolve();
    })

    return Promise.all([q1])
});

// CSS
gulp.task('minify', function(){

	var q = new Promise(function(resolve){
		gulp.src('src/css/*.css')
			// .pipe(rev())
			.pipe(gulp.dest('dist/css'))
			.pipe(minifyCSS())
			.pipe(gulp.dest('dist/css'))
	        .on('end',function(){
	            resolve()
	        })
	});
	return Promise.all([q]);
});
// js
gulp.task('uglify', function(){

	var q = new Promise(function(resolve){
		gulp.src(['src/js/*.js'])
			// .pipe(rev())
			.pipe(uglify({
				compress: true
			}))
			.pipe(gulp.dest('dist/js'))
	        .on('end',function(){
	            resolve()
	        })
	});
	return Promise.all([q]);
});
// img
gulp.task('img', function(){
	
	var q = new Promise(function(resolve){
		gulp.src(['src/img/**/*.*'])
			.pipe(gulp.dest('dist/img'))
	        .on('end',function(){
	            resolve()
	        })
	});
	return Promise.all([q]);
});

// html
gulp.task('html', function(){

	var q = new Promise(function(resolve){
		gulp.src(['src/*.html'])
			.pipe(gulp.dest('dist'))
	        .on('end',function(){
	            resolve()
	        })
	});
	return Promise.all([q]);
});

gulp.task('dev', gulpSequence('webserver'));

gulp.task('build', gulpSequence('clean','version','img','minify','uglify','html'));


function now(timestamp){
    if(timestamp === undefined){
        timestamp = new Date().getTime();
    }else if((''+timestamp).length === 10){
        timestamp = parseInt(timestamp+'000');
    }
    return moment( timestamp ).format('YYYY/MM/DD HH:mm:ss"SSS') 
}




