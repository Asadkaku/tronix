"use strict";

/* Include gulp and plugins */
var gulp = require("gulp"),
  webserver = require("browser-sync"),
  reload = webserver.reload,
  plumber = require("gulp-plumber"),
  sourcemaps = require("gulp-sourcemaps"),
  sass = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  cleanCSS = require('gulp-clean-css'),
  uglify = require("gulp-uglify"),
  cache = require("gulp-cache"),
  imagemin = require("gulp-imagemin"),
  jpegrecompress = require("imagemin-jpeg-recompress"),
  pngquant = require("imagemin-pngquant"),
  del = require("del"),
  fileinclude = require("gulp-file-include"),
  beautify = require("gulp-beautify"),
  minify = require('gulp-minify'),
  concat = require('gulp-concat'),
  jsImport = require("gulp-js-import"),
  newer = require("gulp-newer"),
  // rtlcss = require("gulp-rtlcss"),
  rename = require("gulp-rename"),
  touch = require("gulp-touch-cmd");

/* Paths */
var path = {
  dist: {
    html: "app/dist/",
    js: "app/dist/assets/js/",
    css: "app/dist/assets/css/",
    style: "app/dist/assets/css/",
    img: "app/dist/assets/img/",
    fonts: "app/dist/assets/fonts/",
  },
  src: {
    html: "app/src/*.html",
    htminc: "app/src/components/**/*.html",
    partials: "app/src/components/",
    js: "app/src/assets/js/",
    themejs: "app/src/assets/js/**/*.js",
    style: ["app/src/scss/**/*.scss", "app/src/assets/css/**/*.css"],
    img: "app/src/assets/img/**/*.*",
    fonts: "app/src/assets/fonts/**/*.*",
  },
  watch: {
    html: "app/src/*.html",
    htminc: "app/src/components/**/*.html",
    partials: "app/src/components/",
    themejs: "app/src/assets/js/**/*.js",
    css: ["app/src/scss/**/*.scss", "app/src/css/**/*.css"],
    img: "app/src/assets/img/**/*.*",
    fonts: "app/src/assets/fonts/**/*.*",
  },
  clean: "./app/dist/*",
};

/* Server */
var config = {
  server: {
    baseDir: "./app/dist",
  },
  notify: true,
};

/* Tasks */

// Start the server
gulp.task("webserver", function () {
  webserver(config);
});

// Compile html

gulp.task("html:dist", function () {
  return gulp
    .src(path.src.html)
    .pipe(plumber())
    .pipe(fileinclude({ prefix: '@@', basepath: path.src.partials }))
    .pipe(gulp.dest(path.dist.html))
    .pipe(webserver.reload({ stream: true }));
});

// Compile theme styles
gulp.task("css:dist", function () {
  return (
    gulp
      .src(path.src.style)
      .pipe(newer(path.dist.style))
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
      .pipe(autoprefixer("last 2 version"))
      .pipe(beautify.css({ indent_size: 2, preserve_newlines: false }))
      .pipe(gulp.dest(path.dist.style))
      // .pipe(gulp.dest(path.dist.style))
      // .pipe(rtlcss()) //RTL // Output RTL stylesheets (rtl.css)
      // .pipe(gulp.dest(path.dist.style))
      // .pipe(rtlcss())
      // .pipe(rename({ suffix: '-rtl' }))
      .pipe(touch())
      .pipe(webserver.reload({ stream: true }))
  );
});

// Move fonts

gulp.task("fonts:dist", function () {
  return gulp
    .src(path.src.fonts)
    .pipe(newer(path.dist.fonts))
    .pipe(gulp.dest(path.dist.fonts));
});

// Compile theme js

gulp.task("themejs:dist", function () {
  return gulp
    .src(path.src.themejs)
    .pipe(gulp.dest(path.dist.js))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js))
    .pipe(webserver.reload({ stream: true }));
});

// Image processing
gulp.task("image:dist", function () {
  return gulp.src(path.src.img).pipe(imagemin()).pipe(gulp.dest(path.dist.img))
  // return gulp
  //   .src(path.src.img)
  //   .pipe(newer(path.dist.img))
  //   .pipe(
  //     cache(
  //       imagemin([
  //         imagemin.gifsicle({ interlaced: true }),
  //         jpegrecompress({
  //           progressive: true,
  //           max: 90,
  //           min: 80,
  //         }),
  //         pngquant(),
  //         imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
  //       ])
  //     )
  //   )
  // .pipe(gulp.dest(path.dist.img));
});

// Remove catalog
gulp.task("clean:dist", function () {
  return del(path.clean);
});

// Clear cache
gulp.task("cache:clear", function () {
  cache.clearAll();
});

// Assembly Dist
gulp.task(
  "build:dist",
  gulp.series(
    "clean:dist",
    gulp.parallel(
      "html:dist",
      "css:dist",
      "themejs:dist",
      "fonts:dist",
      "image:dist"
    )
  )
);

// Launching tasks when files change
gulp.task("watch", function () {
  gulp.watch(path.watch.html, gulp.series("html:dist"));
  gulp.watch(path.watch.htminc, gulp.series("html:dist"));
  gulp.watch(path.watch.css, gulp.series("css:dist"));
  gulp.watch(path.watch.themejs, gulp.series("themejs:dist"));
  gulp.watch(path.watch.img, gulp.series("image:dist"));
  gulp.watch(path.watch.fonts, gulp.series("fonts:dist"));
});
// gulp.task("minify", function () {
//   gulp.watch(path.watch.html, gulp.series("html:dist"));
//   gulp.watch(path.watch.htminc, gulp.series("html:dist"));
//   gulp.watch(path.watch.css, gulp.series("css:dist"));
//   gulp.watch(path.watch.themejs, gulp.series("themejs:dist"));
//   gulp.watch(path.watch.img, gulp.series("image:dist"));
//   gulp.watch(path.watch.fonts, gulp.series("fonts:dist"));
// });
gulp.task("minify-js", function () {
  return gulp.src(path.src.themejs)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js));
});


// Serve
gulp.task("serve", gulp.series(gulp.parallel("webserver", "watch")));

// Dist
gulp.task("build:dist", gulp.series("build:dist"));

// Default tasks
gulp.task(
  "default",
  gulp.series("build:dist", gulp.parallel("webserver", "watch"))
);
