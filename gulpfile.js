var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsfiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function() {
    return gulp.src(jsfiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }));
});


gulp.task('serve',['style'], function() {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT' : 3000
        },
        watch : jsfiles
    };

    return nodemon(options)
        .on('restart', function() {
         console.log('Restarting...');   
        });
});


gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');
    var injectSrc = (
        ['./public/css/*.css','./public/js/*.js'], 
        {read: false}
    );

    var injectOptions = {
       ignorePath: '/public'
    };


    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib'
    };

    return gulp.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(inject(gulp.src(['./public/css/*.css','./public/js/*.js'], {read: false}), {relative: true}))
        //.pipe(inject(gulp.src(injectSrc), injectOptions))
        .pipe(gulp.dest('./src/views'));
});