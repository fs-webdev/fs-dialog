const babel = require('gulp-babel');
const cssSlam = require('css-slam').gulp;
const fs = require('fs');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const htmlMinifier = require('gulp-htmlmin');
const HtmlSplitter = require('polymer-build').HtmlSplitter;
const glob = require('glob');
const PolymerProject = require('polymer-build').PolymerProject;
const project = new PolymerProject({
  sources: [
   './fs*.+(html|js)',
   './get-root-node-polyfill.js'
  ],
});
const uglify = require('gulp-uglify');

var path = require('path');

// gulp.task('build', ['transpileAndMinify']);

gulp.task('watch', function() {
  gulp.watch('src/*', ['build']);
});

gulp.task('default', ['build']);

gulp.task('moveFiles', function(done) {
  return gulp.src(['./src/*', '!./src/fs-dialog-base.html'])
    .pipe(gulp.dest('./'))
});

gulp.task('injectLocales', ['moveFiles'], function(done) {
  glob('locales/*.json', function(err, files) {
    if (err) done(err);

    let langObj = {};

    files.forEach(function(file) {
      const filePath = path.basename(file, '.json');
      const lang = filePath.substr(filePath.lastIndexOf('_')+1);

      try {
        const contents = fs.readFileSync(file, 'utf-8');
        langObj[lang] = JSON.parse(contents);
      } catch(e) {
        done(e);
      }
    });

    fs.readFile('./src/fs-dialog-base.html', 'utf-8', function(err, file) {
      if (err) done(err);

      file = file.replace('/* LANG CODE */', JSON.stringify(langObj));

      fs.writeFile('./fs-dialog-base.html', file, 'utf-8', done);
    });
  });
});

gulp.task('build', ['injectLocales'], function(done) {
  try {
    const sourcesHtmlSplitter = new HtmlSplitter();
    const sourcesStream = project.sources()
      .pipe(sourcesHtmlSplitter.split()) // split inline JS & CSS out into individual .js & .css files
      .pipe(gulpif(/\.js$/, babel())) // transpile to es5
      .pipe(gulpif(/\.js$/, uglify())) // minify
      .pipe(gulpif(/\.css$/, cssSlam())) // minify css (but it may not actually do anything)
      .pipe(gulpif(/\.html$/, cssSlam())) // there is a bug in polymer-build that makes it so that css doesn't actually get split out - we can still run the css minifier on the html part of the file though.
      .pipe(gulpif(/\.html$/, htmlMinifier({
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeComments: true,
        minifyCss: true
      }))) // minify html
      .pipe(sourcesHtmlSplitter.rejoin()) // rejoins those files back into their original location
      .pipe(gulp.dest('./'));
  } catch (err) {
    done(err)
  }
});














