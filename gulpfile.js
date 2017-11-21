const gulp = require('gulp');
const fs = require('fs');
const glob = require('glob');
const PolymerProject = require('polymer-build').PolymerProject;
const project = new PolymerProject({
  sources: [
   './fs*.+(html|js)',
   './get-root-node-polyfill.js'
  ],
});
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const cssSlam = require('css-slam').gulp;
const htmlMinifier = require('gulp-htmlmin');
// const htmlMinifier = require('gulp-html-minifier');
const HtmlSplitter = require('polymer-build').HtmlSplitter;
const babel = require('gulp-babel');


var path = require('path');

gulp.task('build', function(done) {
  let langObj = {};

  glob('locales/*.json', function(err, files) {
    if (err) done(err);

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

    gulp.src(['./src/*', '!./src/fs-dialog-base.html']).pipe(gulp.dest('./'));
    fs.readFile('./src/fs-dialog-base.html', 'utf-8', function(err, file) {
      if (err) done(err);

      file = file.replace('/* LANG CODE */', JSON.stringify(langObj));

      fs.writeFile('./fs-dialog-base.html', file, 'utf-8', transpileAndMinify);
    });
  });

  function transpileAndMinify () {
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
      done()
    } catch (err) {
      done(err)
    }
  }

});

gulp.task('watch', function() {
  gulp.watch('src/*', ['build']);
});

gulp.task('default', ['build']);
