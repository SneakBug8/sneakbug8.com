var gulp = require('gulp');
const minify = require('gulp-minify');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var sass = require('gulp-sass');

gulp.task('default', function ()
{
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('bin'));
});

gulp.task("minify", function ()
{
    return gulp.src("assets/*.js")
        .pipe(minify())
        .pipe(gulp.dest('www'))
})

gulp.task('sass', function ()
{
    return gulp.src('assets/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('www/'));
});

gulp.task('sass:watch', function ()
{
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task("assets", function ()
{
    return gulp.src(['assets/**/*', '!*.js', "!*.scss"])
        .pipe(gulp.dest('www/'));
})

exports.build = gulp.series("default", "minify", 'sass', "assets");