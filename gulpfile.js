const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const mqpacker = require('css-mqpacker');
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const svgstore = require("gulp-svgstore");
const svgmin = require("gulp-svgmin");
const del = require("del");
const run = require("run-sequence");

gulp.task("sass", function() {
  gulp.src('build/sass/style.scss')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Edge versions",
        "last 2 Opera version"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true}))
})

// gulp.task("html", function() {
//   gulp.src('*.html')
//     .pipe(gulp.dest('build/'))
//     .pipe(browserSync.reload({stream: true}))
// })

gulp.task("images", function() {
  gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(gulp.dest("img"))
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
})

gulp.task("symbols", function() {
  gulp.src("build/img/icons/*.svg")
    .pipe(gulp.dest("img"))
    .pipe(rename("symbols.svg"))
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
});

gulp.task("copy", function() {
  gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**",
    "*.html"
  ],
  {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("build", function(fn) {
  run(
    "clean",
    "copy",
    "style",
    "images",
    "symbols",
    fn
  );
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'build'
    },
    notify: false,
    open: false,
    port: 8080
  });
  gulp.watch("sass/**/*.scss", ['sass']);
  gulp.watch("*.html").on("change", server.reload);
});



gulp.task("serve", ["style"], function() {
  server.init({
    server: "build"
  });
  gulp.watch("less/**/*.less", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
 });

