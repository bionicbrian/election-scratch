"use strict";

var gulp = require("gulp");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var babelify = require("babelify");
var watch = require("gulp-watch");

gulp.task("bundle-js", function() {
    return browserify("./src/js/main.js")
            .transform(babelify)
            .bundle()
            .pipe(source("bundle.js"))
            .pipe(gulp.dest("./public/js"));
});

gulp.task("default", function () {
    gulp.watch("./src/js/**/*.js", ["bundle-js"]);
});
