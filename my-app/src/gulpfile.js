// Define the required packages
var gulp        = require('gulp'),
    stylus      = require('gulp-stylus'),
    concat      = require('gulp-concat'),
    sourcemaps  = require('gulp-sourcemaps');

/**
 * Task: default (when running "gulp")
 *
 * This will:
 * Run the watch, collect-static & bi-sync-folders
 */
gulp.task('default', ['watch']);

/**
 * Will watch SCSS and JS files and compile them on change.
 */
gulp.task('watch', ['compile-css'], function() {
    gulp.watch('stylus/**/*.styl', ['compile-css']);
});

gulp.task('compile-css', function () {

    return gulp.src([
        './stylus/index.styl'
    ])
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(concat('./index.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./'));
});