const gulp = require('gulp');
const fs = require('fs');
const glob = require('glob');
const PolymerProject = require('polymer-build').PolymerProject;
const project = new PolymerProject({
  entrypoint: 'index.html'
});
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const htmlMinifier = require('gulp-html-minifier');
const HtmlSplitter = require('polymer-build').HtmlSplitter;
const babel = require('gulp-babel');


var path = require('path');

gulp.task('build', function(done) {
  // glob('locales/*.json', function(err, files) {
  //   if (err) done(err);

  //   let langObj = {};

  //   files.forEach(function(file) {
  //     const filePath = path.basename(file, '.json');
  //     const lang = filePath.substr(filePath.lastIndexOf('_')+1);

  //     try {
  //       const contents = fs.readFileSync(file, 'utf-8');
  //       langObj[lang] = JSON.parse(contents);
  //     } catch(e) {
  //       done(e);
  //     }
  //   });

  //   // console.log(JSON.stringify(langObj,null,2));
  //   // done();

  //   gulp.src(['./src/*', '!./src/fs-dialog-base.html']).pipe(gulp.dest('./'));
  //   fs.readFile('./src/fs-dialog-base.html', 'utf-8', function(err, file) {
  //     if (err) done(err);

  //     file = file.replace('/* LANG CODE */', JSON.stringify(langObj));

  //     fs.writeFile('./fs-dialog-base.html', file, 'utf-8', done);
  //   });
  // });

  const sourcesHtmlSplitter = new HtmlSplitter();
  const sourcesStream = project.sources()
    .pipe(sourcesHtmlSplitter.split()) // split inline JS & CSS out into individual .js & .css files
    .pipe(gulpif(/\.js$/, babel()))
    .pipe(gulpif(/\.js$/, uglify()))
    .pipe(gulpif(/\.css$/, cssmin()))
    .pipe(gulpif(/\.html$/, htmlMinifier()))
    .pipe(sourcesHtmlSplitter.rejoin()) // rejoins those files back into their original location
    .pipe(gulp.dest('test-build'));


});

gulp.task('watch', function() {
  gulp.watch('src/*', ['build']);
});

gulp.task('default', ['build']);
