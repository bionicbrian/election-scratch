"use strict";

var gulp = require("gulp");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var babelify = require("babelify");
var watch = require("gulp-watch");

function bundle() {
    return browserify("./src/js/main.js")
            .transform(babelify)
            .bundle()
            .pipe(source("bundle.js"))
            .pipe(gulp.dest("./public/js"));
}

gulp.task("bundle-js", bundle);

gulp.task("default", function () {
    bundle();
    gulp.watch("./src/js/**/*.js", ["bundle-js"]);
});
