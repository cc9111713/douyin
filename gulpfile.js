var gulp = require('gulp');
var sass=require('gulp-sass');
var autoprefixer=require('gulp-autoprefixer');
var concat=require('gulp-concat');
var clean=require('gulp-clean-css');
var server=require('gulp-webserver');
var url=require('url');
var fs=require('fs');
var path=require('path');
var uglify=require('gulp-uglify');
var babel=require('gulp-babel');
// sass编译
gulp.task('minSass',function(){
    return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css/'))
})

gulp.task('concat',function(){
    return gulp.src('./src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./src/js/'))
})

gulp.task('watch',function(){
    gulp.watch('./src/scss/*.scss',gulp.series('minSass'))
})

gulp.task('server',function(){
    return gulp.src('./src/')
    .pipe(server({
        port:3030,
        open:true,
        livereload: true
    }))
})

gulp.task('clean',function(){
    return gulp.src('./src/css/index.css')
    .pipe(clean())
    .pipe(gulp.dest('./src/dist/css/'))
})

gulp.task('uglify',function(){
    return gulp.src('./src/js/all.js')
    .pipe(babel({
        presets:'es2015'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./src/dist/js/'))
})

gulp.task('default',gulp.series('minSass','server','concat','watch'))
gulp.task('build',gulp.parallel('uglify','clean'))