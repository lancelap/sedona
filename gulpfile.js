const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

gulp.task('sass', function() {
  gulp.src('sass/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('html', function() {
  gulp.src('*.html')
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('browser-sync', function() {
  browserSync({
    server: { 
      baseDir: 'build' 
    },
    notify: false,
    open: false,
    port: 8080
  });
});


gulp.task('dev', ['browser-sync', 'sass', 'html'], function() {
  gulp.watch('sass/**/*.scss', ['sass'])
  gulp.watch('*.html', ['html'])
})
