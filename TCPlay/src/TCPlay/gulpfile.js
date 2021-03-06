﻿/// <binding BeforeBuild='compile-sass' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");

var paths = {
    webroot: "./wwwroot/"
};

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.scss = paths.webroot + "css/**/*.scss";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";



gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);



gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

//sass
gulp.task('watch-sass', function () {
    gulp.watch(paths.scss, ['compile-sass']);
})

gulp.task('compile-sass', function() {
    gulp.src(paths.scss)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.webroot + "css"));
});