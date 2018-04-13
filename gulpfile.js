let gulp = require('gulp')
let uglifyjs = require('gulp-uglify')
let mincss = require('gulp-minify-css')
let minhtml = require('gulp-minify-html')
let jslint = require('gulp-jshint')
let concat = require('gulp-concat')
let compileless = require('gulp-less')
let rename = require('gulp-rename')
let imagemin = require('gulp-imagemin')
let pngquant = require('imagemin-pngquant')

gulp.task('concatjs', function () {
  gulp.src('src/js/*.js')
    .pipe(concat("index.js"))
    .pipe(gulp.dest('src/js'));
});

gulp.task('concatcss', function () {
  gulp.src('src/css/*.css')
    .pipe(concat('index.css'))
    .pipe(gulp.dest('src/css'));
});

gulp.task('concat', ['concatjs', 'concatcss'], function () {
  console.log('合并成功');

});
gulp.task('minhtml', function () {
  gulp.src('src/*.html')
    .pipe(minhtml())
    .pipe(gulp.dest('build'));
});

gulp.task('jslint', function () {
  gulp.src('src/js/*.js')
    .pipe(jslint())
    .pipe(jslint.reporter());
});

gulp.task('compile-less', function () {
  gulp.src('src/less/*.less')
    .pipe(compileless())
    .pipe(gulp.dest('src/css'));
});

gulp.task('mincss', ['compile-less'], function () {
  gulp.src('src/css/*.css')
    .pipe(concat('index.css'))
    .pipe(mincss())
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('minjs', function () {
  gulp.src('src/js/*.js')
    .pipe(concat("index.js"))
    .pipe(uglifyjs())
    .pipe(rename("index.min.js"))
    .pipe(gulp.dest('build/js'));
});

gulp.task('imagemin', function () {
  gulp.src('src/img/*')
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest('build/img'));
});

gulp.task('minify', ['mincss', 'minjs', 'imagemin', 'minhtml'], function () {
  console.log("压缩成功");
});

gulp.task('default', ['jslint', 'minify'], function () {
  console.log("ok");
});