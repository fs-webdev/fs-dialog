const babel = require('gulp-babel');
const cssSlam = require('css-slam').gulp;
const fs = require('fs');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const htmlMinifier = require('gulp-htmlmin');
const HtmlSplitter = require('polymer-build').HtmlSplitter;
const glob = require('glob');
const replace = require('gulp-replace');
const PolymerProject = require('polymer-build').PolymerProject;
const project = new PolymerProject({
  sources: [
   './fs-anchored-dialog.html',
   './fs-dialog-base.html',
   './fs-dialog-positioning-obj.js',
   './fs-dialog-service.js',
   './fs-modal-dialog.html',
   './fs-modeless-dialog.html',
   './get-root-node-polyfill.js'
  ],
});
const uglify = require('gulp-uglify');

var path = require('path');

gulp.task('watch', function() {
  gulp.watch('src/*', ['build']);
});

gulp.task('default', ['build']);

gulp.task('moveFiles', function(done) {
  return gulp.src(['./src/*', '!./src/fs-dialog-base.html'])
    .pipe(gulp.dest('./'))
});

gulp.task('build', ['moveFiles'], function(done) {
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

