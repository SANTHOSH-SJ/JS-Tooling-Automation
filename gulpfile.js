const gulp = require("gulp");
const sass = require('gulp-sass');
const autoprefixer = require("gulp-autoprefixer"); // to make css compatible for all browsers. see npm for example 
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");


gulp.task("sass", async () => {
  gulp
    .src("./sass/**/*.scss") // all saas files inside saas folder and saas sub-folders
    .pipe(
      sass({
        outputStyle: 'compressed'
      })
        .on("error", sass.logError)) // converts file from saas to proper css; on error log error and coninue instead of breaking
    .pipe(autoprefixer({
      "overrideBrowserslist": [
        "defaults"
      ]
    }))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream()); //  reload at specific points during our tasks; here -when css changed reload
});

// copy html file
gulp.task("copy-html", async () => {
  gulp
    .src("./*.html")
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
});

// copy img files
gulp.task("copy-img", async () => {
  gulp
    .src("./img/**/*")
    .pipe(gulp.dest("./dist/img"))
});


// js for development
gulp.task("scripts-dev", async () => {
  gulp
    .src("./js/**/*.js")
    .pipe(concat("main.js"))
    .pipe(gulp.dest("./dist/js"));

});

// js for production
gulp.task("scripts-dist", async () => {
  gulp
    .src("./js/**/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"));

});



// watch for file change and rebuild
gulp.task("watcher", async () => {
  gulp.watch("./sass/**/*.scss", gulp.parallel('sass'));
  // gulp.watch("./*.html", gulp.parallel("copy-html")); // copy html file and reload

  gulp.watch("./dist/*.html").on("change", browserSync.reload); // reload only when html file inside dist is modified

  // starts the server
  browserSync.init({
    server: "./dist"
  });
});


gulp.task("prod", gulp.parallel(
  "sass",
  "copy-img",
  "copy-html",
  "scripts-dist"
  ));



// executes by default and run only once
gulp.task("default", gulp.series(gulp.parallel("sass", "copy-html", "copy-img"), 'watcher'));
