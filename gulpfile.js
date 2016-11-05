var gulp = require("gulp");
var sass = require('gulp-sass');

gulp.task('sass', function() {
  return gulp.src('./app/static/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/static/css'));
});

gulp.task('watch', function() {
  gulp.watch('./app/static/css/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);