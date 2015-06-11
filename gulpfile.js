"use strict";

var gulp = require("gulp");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var babelify = require("babelify");

gulp.task("default", function() {
    var bundler = browserify("./src/js/main.js");

    function rebundle() {
        console.log("Updating...");
        return bundler.bundle()
            .pipe(source("bundle.js"))
            .pipe(gulp.dest("./public/js"));
    }

    bundler
        .transform(babelify)
        .on("update", rebundle);

    return rebundle();
});
