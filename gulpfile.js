var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var addsrc = require('gulp-add-src');

var uglifyConfig = require('./uglify');

gulp.task('queue-dev', function() {
  gulp.src('./src/loader-dev.js')
    .pipe(rename('ra-queue.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('queue-production', function() {
  gulp.src('./src/loader.js')
    .pipe(uglify(uglifyConfig))
    .pipe(rename('ra-queue.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.watch('./src/loader.js', ['queue-dev', 'queue-production']);
gulp.task('default', ['queue-dev', 'queue-production']);
