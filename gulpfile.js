const gulp = require("gulp");
const sass = require('gulp-sass');
const autoprefixer = require("gulp-autoprefixer"); // to make css compatible for all browsers. see npm for example 

gulp.task("default", async () => {
  // code for your default task goes here

  // watch for file change and rebuild
  gulp.watch("./sass/**/*.scss", gulp.series('sass'));

});


gulp.task("sass", async () => {
  console.log("inside gulp sass");
  gulp
    .src("./sass/**/*.scss") // all saas files inside saas folder and saas sub-folders
    .pipe(sass().on("error", sass.logError)) // converts file from saas to proper css; on error log error and coninue instead of breaking
    .pipe(autoprefixer({
      "overrideBrowserslist": [
        "defaults"
      ]
    })
    )
    .pipe(gulp.dest("./css"));
});

// gulp.watch("./sass/**/*.scss", ["sass"]);
