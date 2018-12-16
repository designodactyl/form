'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
// var livereload = require('gulp-livereload');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var log = require('gulplog');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var notify = require('gulp-notify');
var notifier = require('node-notifier');

var paths = {
  scripts: {
    source: './src/js/main.js',
    destination: './web/assets/js',
    filename: 'bundle.js',
    watch: './src/js/main.js'
  }
}

// BrowserSync proxy
gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: "localhost:8888/newForm/web/"
  });
});

// BrowserSync reload all Browsers
gulp.task('browsersync-reload', function () {
    browserSync.reload();
});


gulp.task('scripts', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: [paths.scripts.source],
    debug: true
  });

  return b.bundle()
    .pipe(source(paths.scripts.filename))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', function(err){
          console.log(err.stack);

          notifier.notify({
            'title': 'Compile Error',
            'message': err.message
          });
        })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.destination))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('styles', function () {
  gulp.src('./src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./web/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('jshint', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(jshint())
    .pipe(uglify())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(notify({ message: 'Lint task complete' }));
});


gulp.task('watch', ['browser-sync'], function () {
  gulp.watch('./src/scss/**/*.scss', ['styles', 'browsersync-reload']);
  gulp.watch('./src/js/**/*.js', ['jshint', 'scripts', 'browsersync-reload']);
  gulp.watch('./templates/**/*', ['browsersync-reload']);
});

gulp.task('default', ['styles', 'scripts', 'watch']);
