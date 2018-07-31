var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    mqpacker = require('css-mqpacker'),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    livereload = require('gulp-livereload');

gulp.task('css', function () {
    var processors = [
        mqpacker({
            sort: true
        }),
        cssnano
    ];

    gulp.src('./styles/src/*.scss')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./styles/css'))
        .pipe(livereload({ start: true }));
});




// Watch .scss file
gulp.task("watch", function () {
    gulp.watch(['./styles/src/**/*.scss'], ['css']);
});

// gulp.task("default", ["css","uglify", "watch"]);
gulp.task("default", ["css", "watch"]);