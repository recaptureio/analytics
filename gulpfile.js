var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var uglifyConfig = require('./uglify');

gulp.task('queue', function() {
  gulp.src('./src/loader.js')
    .pipe(uglify(uglifyConfig))
    .pipe(rename('ra-queue.min.js'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('default', ['queue']);
