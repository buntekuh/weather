// Require
var gulp        = require('gulp');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var less        = require('gulp-less');
var sass        = require('gulp-sass');
watch           = require('gulp-watch');
var KarmaServer = require('karma').Server;
var webserver   = require('gulp-webserver');

// //////////////////////////////////////////////////
// TESTING
// //////////////////////////////////////////////////
// Test suite
gulp.task('test', function (done) {
  return new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

// continuous testing
gulp.task('tdd', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
  }, done).start();
});

// Default task runs test suite
gulp.task('default', ['test']);

// //////////////////////////////////////////////////
// BUILDING
// //////////////////////////////////////////////////
// All necessary tasks to build project
gulp.task('dist', ['js-src', 'css-src', 'html-src', 'lib']);

// Build application js
gulp.task('js-src', function(){
  gulp.src('src/**/*.js')
    //.pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('app/js'))
});

// Build css
gulp.task('css-src', function(){
  return gulp.src('src/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('app.css'))
      .pipe(gulp.dest('app/css'));
});

// Build html templates
gulp.task('html-src', function(){
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('app/'));
});

// Processing lib files
gulp.task('lib', function(){
  gulp.src([
    'bower_components/angular/angular.js',
    'bower_components/jquery/dist/jquery.js', 
    'bower_components/bootstrap/dist/js/bootstrap.js'
    ])
    .pipe(uglify())
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('app/js'));

    gulp.src('bower_components/bootstrap/less/bootstrap.less')
      .pipe(less())
      .pipe(gulp.dest('app/css'));
});

// //////////////////////////////////////////////////
// WATCH
// //////////////////////////////////////////////////
gulp.task('watch', function(){
  gulp.watch('src/**/*.scss', ['css-src']);
  gulp.watch('src/**/*.js', ['js-src']);
  gulp.watch('src/**/*.html', ['html-src']);
});

// //////////////////////////////////////////////////
// WEBSERVER
// //////////////////////////////////////////////////
gulp.task('web', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      directoryListing: {
          enable:true,
          path: 'app'
      },
      open: true
    }));
});


