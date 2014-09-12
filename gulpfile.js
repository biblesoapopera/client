var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var smoosher = require('gulp-smoosher');
var minifyHTML = require('gulp-minify-html');
var livereload = require('gulp-livereload');
var ghPages = require('gulp-gh-pages');
var bso = require('./tools/bsoBuilder');
var fileinclude = require('gulp-file-include');

var paths = {
  distjs: ['src/js/**/*.js'],
  devjs: ['src/js/**/*.js', 'tools/livereload.js'],
  mainless: ['src/less/main.less'],
  less: ['src/less/**/*.less'],
  index: ['src/index.html'],
  devcopy: ['src/icons/favicon.png'],  
  distcopy: ['src/icons/favicon.png'],
  templates: ['src/js/**/*.html'],
  slidedata: ['data/**/*.js']
};

gulp.task('dev-copy', function() {
  return gulp.src(paths.devcopy)    
    .pipe(gulp.dest('dev'));
});

gulp.task('dist-copy', function() {
  return gulp.src(paths.devcopy)    
    .pipe(gulp.dest('dist'));
});

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
    .pipe(fileinclude({prefix: '@@', basepath: '@file'}))
    .pipe(smoosher())  
    .pipe(gulp.dest('dev'))
    .pipe(livereload())
});

gulp.task('dist-index', ['dist-js', 'dist-less'], function() {
  return gulp.src(paths.index)
    .pipe(fileinclude({prefix: '@@', basepath: '@file'}))  
    .pipe(smoosher())
    .pipe(minifyHTML({}))
    .pipe(gulp.dest('dist'))
});

gulp.task('dev-bso', function(){
  bso(path.join(__dirname, 'dev'));
});

gulp.task('dist-bso', function(){
  bso(path.join(__dirname, 'dist'));
});

gulp.task('dev-server', function(){
  require('./tools/devserver');
});

gulp.task('dev', ['dev-server', 'dev-copy', 'dev-index', 'dev-bso']);

gulp.task('dist', ['dist-index', 'dist-copy', 'dist-bso']);

gulp.task('deploy', ['dist'], function(){
  gulp.src("dist/**/*")
    .pipe(ghPages());  
});

// Rerun the task when a file changes
gulp.task('dev-watch', function() {
  gulp.watch(paths.templates, ['dev-index']);    
  gulp.watch(paths.devjs, ['dev-index']);
  gulp.watch(paths.less, ['dev-index']);
  gulp.watch(paths.index, ['dev-index']);
  gulp.watch(paths.slidedata, ['dev-bso', 'dev-index']);  
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['dev-watch', 'dev']);
