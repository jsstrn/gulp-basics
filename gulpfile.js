const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')

function customPlumber () {
  return plumber({
    errorHandler: function (err) {
      console.log(err.stack)
      this.emit('end')
    }
  })
}

gulp.task('sass', () => {
  return gulp.src('scss/**/*.scss')
    .pipe(customPlumber())
    .pipe(sass({
      includePaths: ['./node_modules']
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream())
})

gulp.task('watch', ['sass'], () => {
  gulp.watch('scss/style.scss', ['sass'])
  gulp.watch('*.html', browserSync.reload)
})

gulp.task('browser-sync', ['watch'], () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
})

gulp.task('default', ['browser-sync'])
