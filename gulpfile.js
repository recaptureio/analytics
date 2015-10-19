var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var uglifyConfig = require('./uglify');

gulp.task('loader', function() {
  gulp.src('./src/loader.js')
    .pipe(uglify(uglifyConfig))
    .pipe(rename('loader.min.js'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('default', ['loader']);
