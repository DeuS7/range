var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
var webpack_stream = require("webpack-stream");
const webpack_config = require('./webpack.config.js');

gulp.task('hello', function() {
	console.log('hello world!');
});

gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('wa', ['browserSync'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  //gulp.watch('app/js/**/*.js', ['babel']);
  gulp.watch('app/jsNext/**/*.js', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload); 
});

gulp.task('babel', () =>
  gulp.src('app/jsNext/**/*.js')
  .pipe(babel({
    presets: ['env', 'es2015']
  }))
  .pipe(gulp.dest('app/js'))
  .pipe(browserSync.reload({
      stream: true
    }))
  );

const paths = {
    src: './app/js/main.js',
    build: './dist'
};

gulp.task('webpack', () => {
  return webpack_stream(webpack_config)
  .pipe(gulp.dest(`${paths.build}`))
  .pipe(browserSync.reload({
    stream: true
  }))
});
