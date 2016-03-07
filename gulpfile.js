var gulp = require('gulp')
var plumber = require('gulp-plumber')
var postcss = require('gulp-postcss')
var gutil = require('gulp-util')

var onError = function (err) {
  gutil.beep();
  console.log(err);
};

gulp.task('default', ['build', 'watch'])

gulp.task('build', function () {
  return gulp.src('test/styles.css')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe( postcss([
      require('postcss-discard-comments'),
      //require('./index.js')
    ]) )
    .pipe( gulp.dest('test/build') )
})

gulp.task('watch', function() {
  gulp.watch('test/styles.css', ['build'])
})
