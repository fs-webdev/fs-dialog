const gulp = require('gulp');
const fs = require('fs');
const glob = require('glob');
const PolymerProject = require('polymer-build').PolymerProject;
const project = new PolymerProject({
  entrypoint: 'index.html',
  shell: 'fs-dialog-all.html',

});
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const cssSlam = require('css-slam').gulp;
const htmlMinifier = require('gulp-html-minifier');
const HtmlSplitter = require('polymer-build').HtmlSplitter;
const mergeStream = require('merge-stream');
import {transform as babelTransform, TransformOptions as BabelTransformOptions} from 'babel-core';
import {Transform} from 'stream';


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
    // .pipe(gulpif(/\.js$/, uglify())) // TODO: compile to es5
    .pipe(gulpif(/\.js$/, uglify()))
    .pipe(gulpif(/\.css$/, cssSlam()))
    .pipe(gulpif(/\.html$/, htmlMinifier()))
    .pipe(sourcesHtmlSplitter.rejoin()); // rejoins those files back into their original location


});

gulp.task('watch', function() {
  gulp.watch('src/*', ['build']);
});

gulp.task('default', ['build']);

// export class GenericOptimizeTransform extends Transform {
//   optimizer: (content: string, options: any) => string;
//   optimizerName: string;
//   optimizerOptions: any;

//   constructor(
//       optimizerName: string,
//       optimizer: (content: string, optimizerOptions: any) => string,
//       optimizerOptions: any) {
//     super({objectMode: true});
//     this.optimizer = optimizer;
//     this.optimizerName = optimizerName;
//     this.optimizerOptions = optimizerOptions || {};
//   }

//   _transform(file: File, _encoding: string, callback: FileCB): void {
//     // TODO(fks) 03-07-2017: This is a quick fix to make sure that
//     // "webcomponentsjs" files aren't compiled down to ES5, because they contain
//     // an important ES6 shim to make custom elements possible. Remove/refactor
//     // when we have a better plan for excluding some files from optimization.
//     if (!file.path || file.path.indexOf('webcomponentsjs/') >= 0 ||
//         file.path.indexOf('webcomponentsjs\\') >= 0) {
//       callback(null, file);
//       return;
//     }

//     if (file.contents) {
//       try {
//         let contents = file.contents.toString();
//         contents = this.optimizer(contents, this.optimizerOptions);
//         file.contents = new Buffer(contents);
//       } catch (error) {
//         logger.warn(
//             `${this.optimizerName}: Unable to optimize ${file.path}`,
//             {err: error.message || error});
//       }
//     }
//     callback(null, file);
//   }
// }

// class JSBabelTransform extends GenericOptimizeTransform {
//   constructor(config: BabelTransformOptions) {
//     const transform = (contents: string, options: BabelTransformOptions) => {
//       return babelTransform(contents, options).code!;
//     };
//     super('.js', transform, config);
//   }
// }


// export class JSDefaultCompileTransform extends JSBabelTransform {
//   constructor() {
//     super({
//       presets: [babelPresetES2015NoModules],
//       plugins: [externalHelpersPlugin],
//     });
//   }
// }
