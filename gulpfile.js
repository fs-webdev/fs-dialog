const gulp = require('gulp');
const fs = require('fs');
const glob = require('glob');
var path = require('path');

gulp.task('build', function(done) {
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

    // console.log(JSON.stringify(langObj,null,2));
    // done();

    gulp.src(['./src/*', '!./src/fs-dialog-base.html']).pipe(gulp.dest('./'));
    fs.readFile('./src/fs-dialog-base.html', 'utf-8', function(err, file) {
      if (err) done(err);

      file = file.replace('/* LANG CODE */', JSON.stringify(langObj));

      fs.writeFile('./fs-dialog-base.html', file, 'utf-8', done);
    });
  });
});

gulp.task('watch', function() {
  gulp.watch('src/*', ['build']);
});

gulp.task('default', ['build']);
