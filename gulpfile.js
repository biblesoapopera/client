var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var smoosher = require('gulp-smoosher');
var minifyHTML = require('gulp-minify-html');
var livereload = require('gulp-livereload');
var ghPages = require('gulp-gh-pages');
var bso = require('build/bsoBuilder');

var paths = {
  distjs: ['src/js/**/*.js'],
  devjs: ['src/js/**/*.js', 'tools/livereload.js'],
  mainless: ['src/less/main.less'],
  less: ['src/less/**/*.less'],
  index: ['src/index.html']
};

gulp.task('dev-js', function() {
  return gulp.src(paths.devjs)
    .pipe(concat('min.js'))
    .pipe(gulp.dest('temp'));
});

gulp.task('dist-js', function() {
  return gulp.src(paths.distjs)
    .pipe(uglify())
    .pipe(concat('min.js'))
    .pipe(gulp.dest('temp'));
});

gulp.task('dev-less', function() {
  return gulp.src(paths.mainless)
    .pipe(less({paths: [path.join(__dirname, 'src', 'less')], compress: false}))
    .pipe(concat('min.css'))
    .pipe(gulp.dest('temp'));
});

gulp.task('dist-less', function() {
  return gulp.src(paths.mainless)
    .pipe(less({paths: [path.join(__dirname, 'src', 'less')], compress: true}))
    .pipe(concat('min.css'))
    .pipe(gulp.dest('temp'));
});

gulp.task('dev-index', ['dev-js', 'dev-less'], function() {
  return gulp.src(paths.index)
    .pipe(smoosher())  
    .pipe(gulp.dest('dev'))
    .pipe(livereload())
});

gulp.task('dist-index', ['dist-js', 'dist-less'], function() {
  return gulp.src(paths.index)
    .pipe(smoosher())
    .pipe(minifyHTML({}))
    .pipe(gulp.dest('dist'))
});

gulp.task('dev-bso', function(){
  bso(path.join(__dirname, 'dev');
};

gulp.task('dist-bso', function(){
  bso(path.join(__dirname, 'dist');
};

gulp.task('dev-server', function(){
  require('tools/devserver.js');
});

gulp.task('dev', ['dev-bso', 'dev-server', 'dev-index']);

gulp.task('dist', ['dist-bso', 'dist-index']);

gulp.task('deploy', ['dist'], function(){
  gulp.src("dist/**/*")
    .pipe(deploy(options));  
});

// Rerun the task when a file changes
gulp.task('dev-watch', function() {
  gulp.watch(paths.js, ['dev-index']);
  gulp.watch(paths.less, ['dev-index']);
  gulp.watch(paths.index, ['dev-index']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['dev-watch', 'dev']);
