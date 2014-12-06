var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var livereload = require('gulp-livereload');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var bso = require('./tools/bsoBuilder');
var twig = require('./tools/gulpTwig');
var base64 = require('./tools/gulpBase64');
var argv = require('yargs').argv;

var buildType = 'dev';
if (argv.dist) buildType = 'dist'

var sourcePaths = {
   dev: {
       js: ['src/**/*.js', 'tools/livereload.js'],
       mainless: ['src/less/main.less'],
       less: ['src/less/**/*.less'],
       maintwig: ['src/twig/**/*.twig', '!src/twig/include/**/*'],
       twig: ['src/twig/**/*.twig'],
       imagemin: ['src/**/*.png', '!src/phone.png'],
       base64: ['temp/favicon.png'],
       copy: ['src/phone.png'],
       slidedata: ['data/**/*.json']
   },
   dist: {
       js: ['src/**/*.js'],
       mainless: ['src/less/main.less'],
       less: ['src/less/**/*.less'],
       maintwig: ['src/twig/**/*.twig', '!src/twig/include/**/*'],
       twig: ['src/twig/**/*.twig'],      
       imagemin: ['src/**/*.png', '!src/phone.png'],
       base64: ['temp/favicon.png'],       
       copy: ['src/phone.png'],
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

gulp.task('less', ['imagemin'], function() {
  return gulp.src(sourcePaths[buildType].mainless)
    .pipe(gulpif(buildType === 'dist', less({paths: [path.join(__dirname, 'src', 'less')], compress: true})))
    .pipe(gulpif(buildType === 'dev', less({paths: [path.join(__dirname, 'src', 'less')], compress: false})))
    .pipe(concat('min.css'))
    .pipe(gulp.dest('temp'));
});

gulp.task('imagemin', function(){
  return gulp.src(sourcePaths[buildType].imagemin)
    .pipe(gulpif(buildType === 'dist', imagemin({optimizationLevel: 7})))
    .pipe(gulp.dest('temp'));
})

gulp.task('base64', ['imagemin'], function(){
  return gulp.src(sourcePaths[buildType].base64)
    .pipe(base64())
    .pipe(gulp.dest('temp'));
})

gulp.task('twig', ['base64', 'js', 'less'], function() {
  return gulp.src(sourcePaths[buildType].maintwig)
    .pipe(twig())        
    .pipe(gulpif(buildType === 'dist', minifyHTML({})))
    .pipe(gulp.dest(targetPaths[buildType]))
});

gulp.task('bso', function() {
  bso(path.join(__dirname, buildType + '/app'));
});

gulp.task('dev-server', function(){
  require('./tools/devserver');
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
if (buildType === 'dist'){
    gulp.task('default', ['main']);    
} else {
    gulp.task('default', ['watch', 'dev-server', 'main']);
}

