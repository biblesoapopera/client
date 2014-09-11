var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var smoosher = require('gulp-smoosher');
var minifyHTML = require('gulp-minify-html');
var livereload = require('gulp-livereload');

var paths = {
  js: ['src/js/**/*.js'],
  mainless: ['src/less/main.less'],
  less: ['src/less/**/*.less'],
  index: ['src/index.html']
};

gulp.task('dev-js', function() {
  return gulp.src(paths.js)
    .pipe(concat('min.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('dist-js', function() {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(concat('min.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('dev-less', function() {
  return gulp.src(paths.mainless)
    .pipe(less({paths: [path.join(__dirname, 'src', 'less')], compress: false}))
    .pipe(concat('min.css'))
    .pipe(gulp.dest('.'));
});

gulp.task('dist-less', function() {
  return gulp.src(paths.mainless)
    .pipe(less({paths: [path.join(__dirname, 'src', 'less')], compress: true}))
    .pipe(concat('min.css'))
    .pipe(gulp.dest('.'));
});

gulp.task('dev-index', ['dev-js', 'dev-less'], function() {
  return gulp.src(paths.index)
    .pipe(smoosher())  
    .pipe(gulp.dest('.'))
    .pipe(livereload())
});

gulp.task('dist-index', ['dist-js', 'dist-less'], function() {
  return gulp.src(paths.index)
    .pipe(smoosher())
    .pipe(minifyHTML({}))
    .pipe(gulp.dest('.'))
});

gulp.task('dev', ['dev-index']);

gulp.task('dist', ['dist-index']);

// Rerun the task when a file changes
gulp.task('dev-watch', function() {
  gulp.watch(paths.js, ['dev-index']);
  gulp.watch(paths.less, ['dev-index']);
  gulp.watch(paths.index, ['dev-index']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['dev-watch', 'dev']);
