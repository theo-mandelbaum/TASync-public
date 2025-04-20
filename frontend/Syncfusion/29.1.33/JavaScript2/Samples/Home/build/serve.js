'use strict';
var fs = require('fs');
var gulp = require('gulp');
var webpackGulp = require('webpack-stream');
var webpack = require('webpack');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

/**
 * Compile ts files
 */
gulp.task('scripts', function(done) {
    var ts = require('gulp-typescript');
    var tsProject = ts.createProject('tsconfig.json', { typescript: require('typescript') });

    var tsResult = gulp.src(['./**/*.ts','./**/*.tsx', '!./node_modules/**/*.ts','!./node_modules/**/*.tsx'], { base: '.' })
        .pipe(tsProject());
    tsResult.js.pipe(gulp.dest('./'))
    .on('end', done);
});

/**
 * Compile styles
 */
gulp.task('styles', function(done) {
    const sass = require('gulp-sass')(require('sass'));
    return gulp.src(['./**/*.scss', '!./node_modules/**/*.scss'], { base: './' })
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: './node_modules/@syncfusion/'
        }))
        .pipe(gulp.dest('.'))
        .on('end', done);
});

gulp.task('serve',gulp.series('scripts','styles',function (done) {
    var browserSync = require('browser-sync');
    var bs = browserSync.create('Essential JS 2 Landing Page');
    var options = {
        server: {
            baseDir: './'
        },
        ui: false
    };
    bs.init(options, done);
}));

// Gulp task to minify css files
gulp.task('css-minify', function(done) {
    gulp.src(['styles/theme.css','styles/style.css','styles/index.css','styles/slideshow.css','styles/opensans.css'])
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('styles'))
        .on('end', done);
});

gulp.task('bundle', gulp.series('css-minify', function (done) {
    var webpackConfig = require(fs.realpathSync('./webpack.config.js'));
    return gulp.src('.')
        .pipe(webpackGulp(webpackConfig, webpack))
        .pipe(gulp.dest('.'))
        .on('end', done);
}));

// Gulp task to minify JavaScript files
gulp.task('js-minify', function(done) {
  return gulp.src(['./src/lottie.min.js','./src/index.min.js','./src/common-script.js'])
    .pipe(uglify())
    .pipe(concat('index.min.js'))
    .pipe(gulp.dest('dist'))
    .on('end', done);
});
