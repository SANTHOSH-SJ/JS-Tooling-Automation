const gulp = require("gulp");
const sass = require('gulp-sass');
const autoprefixer = require("gulp-autoprefixer"); // to make css compatible for all browsers. see npm for example 
const browserSync = require("browser-sync").create();

gulp.task("default", async () => {
  // code for your default task goes here

  // watch for file change and rebuild
  gulp.watch("./sass/**/*.scss", gulp.series('sass'));

  // starts the server
  browserSync.init({
    server: "./"
  });

});


gulp.task("sass", async () => {
  gulp
    .src("./sass/**/*.scss") // all saas files inside saas folder and saas sub-folders
    .pipe(sass().on("error", sass.logError)) // converts file from saas to proper css; on error log error and coninue instead of breaking
    .pipe(autoprefixer({
      "overrideBrowserslist": [
        "defaults"
      ]
    })
    )
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream()); //  reload at specific points during our tasks; here -when css changed reload
});

// gulp.watch("./sass/**/*.scss", ["sass"]);
