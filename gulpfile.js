var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var smoosher = require('gulp-smoosher');
var minifyHTML = require('gulp-minify-html');
var livereload = require('gulp-livereload');
var ghPages = require('gulp-gh-pages');
var gulpif = require('gulp-if');
var bso = require('./tools/bsoBuilder');
var twig = require('./tools/gulpTwig');
var argv = require('yargs').argv;

var buildType = 'dev';
if (argv.dist) buildType = 'dist'

var sourcePaths = {
   dev: {
       js: ['src/js/**/*.js', 'tools/livereload.js'],
       mainless: ['src/less/main.less'],
       less: ['src/less/**/*.less'],
       maintwig: ['src/twig/*.twig'],
       twig: ['src/twig/**/*.twig'],       
       copy: ['src/icons/favicon.png'],
       slidedata: ['data/**/*.json']
   },
   dist: {
       js: ['src/js/**/*.js'],
       mainless: ['src/less/main.less'],
       less: ['src/less/**/*.less'],
       maintwig: ['src/twig/*.twig'],
       twig: ['src/twig/**/*.twig'],         
       copy: ['src/icons/favicon.png'],
       slidedata: ['data/**/*.json']      
   }    
};

var targetPaths = {
    dev: 'dev',
    dist: 'dist'
};

gulp.task('copy', function() {
  return gulp.src(sourcePaths[buildType].copy)    
    .pipe(gulp.dest(targetPaths[buildType]));
});

gulp.task('js', function() {
  return gulp.src(sourcePaths[buildType].js)
    .pipe(concat('min.js'))
    .pipe(gulpif(buildType === 'dist', uglify()))
    .pipe(gulp.dest('temp'));
});

gulp.task('less', function() {
  return gulp.src(sourcePaths[buildType].mainless)
    .pipe(gulpif(buildType === 'dist', less({paths: [path.join(__dirname, 'src', 'less')], compress: true})))
    .pipe(gulpif(buildType === 'dev', less({paths: [path.join(__dirname, 'src', 'less')], compress: false})))
    .pipe(concat('min.css'))
    .pipe(gulp.dest('temp'));
});

gulp.task('twig', ['js', 'less'], function() {
  return gulp.src(sourcePaths[buildType].maintwig)
    .pipe(twig())        
    .pipe(smoosher())  
    .pipe(gulpif(buildType === 'dist', minifyHTML({})))
    .pipe(gulp.dest(targetPaths[buildType]))
});

gulp.task('bso', function() {
  bso(path.join(__dirname, buildType));
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

gulp.task('main', ['copy', 'bso', 'twig']);

// Rerun the task when a file changes
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(sourcePaths.dev.twig, ['twig']);    
  gulp.watch(sourcePaths.dev.js, ['twig']);
  gulp.watch(sourcePaths.dev.less, ['twig']);
  gulp.watch(sourcePaths.dev.slidedata, ['bso', 'twig']);    
  gulp.watch('dev/**/*.html').on('change', function(){setTimeout(livereload.changed, 150)});
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'dev-server', 'main']);

