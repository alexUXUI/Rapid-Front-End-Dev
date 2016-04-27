var gulp = require("gulp")
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var useref = require('gulp-useref')
var uglify = require('gulp-uglify')
var gulpIf = require('gulp-if')
var cssnano = require('gulp-cssnano')
var imagemin = require('gulp-imagemin')
var cache = require('gulp-cache')
var del = require('del')
var runSequence = require('run-sequence')
var babel = require('gulp-babel');

gulp.task('useref', () => {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
})

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('sass', () => {
  return gulp.src('app/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
})

gulp.task('html', () => {
  return glup.src('app/')
})

gulp.task('imagemin', () => {
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
    interlaced: true
  })))
  .pipe(gulp.dist('dist/images'))
})

gulp.task('watch', ["browserSync", "sass"], () => {
  gulp.watch('app/scss/**/*.scss', ["sass"], () => {
  })
})

gulp.task('fonts', () => {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean:dist', () => {
  return del.sync('dist')
})

gulp.task('cache:clear', () => {
  return cache.clearAll()
})

gulp.task('default', () => {
  runSequence('clean:dist',
  ['sass','useref', 'fonts','browserSync', 'watch'], () => {
    console.log('finishing tasks');
  })
})
