//gulp
var gulp = require('gulp');
var pkg = require('./package.json');

// npm tools
var path  = require('path');

// gulp general plugins
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');
var umd = require('gulp-umd');
var sync = require('gulp-config-sync');
var preprocess = require('gulp-preprocess');

var sequence = require('run-sequence');
var del = require('del');
var exec = require('child_process').exec;

// docs & tests
var karma = require('gulp-karma');

// project directories
var dir = {
  src: './source',
  dist: './dist',
  test: './test',
  cover: './coverage',
  docs: './docs'
};

var file = {
  full: 'formi.js',
  min: 'formi.min.js'
};


gulp.task('clean', function(done) {
  del([dir.dist, dir.docs, dir.cover], done);
});


// compile task:
// - concat files
// - UMD
// - uglify 
// - sourcemaps
gulp.task('compile', function() {
  return gulp.src(path.join(dir.src, file.full))
    .pipe(sourcemaps.init())
    .pipe(fileinclude('//='))
    .pipe(preprocess({ context: pkg }))
    .pipe(umd())
    .pipe(gulp.dest(dir.dist))
    .pipe(uglify())
    .pipe(rename(file.min))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dir.dist));
});


gulp.task('docs', function(done) {
  exec('npm run docs', function (err) {
    done(err);
  });
});


// test task:
gulp.task('test', function () {
  return gulp.src(path.join(dir.test, 'tests.html'))
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});


// watch task:
gulp.task('watch', function () {
  gulp.watch(path.join(dir.src, '**/*.js'), ['build']);

  gulp.watch([
    path.join(dir.src, '**/*.js'),
    path.join(dir.test, '**/*test.js')
  ], ['test']);
});


gulp.task('sync-config', function() {
  return gulp.src(['bower.json'])
    .pipe(sync({
      fields: [
        'name',
        'version',
        'description',
        'authors',
        'license',
        'keywords',
        'main',
        'homepage',
        'repository',
        'bugs'
      ]
    }))
    .pipe(gulp.dest('.'));
});


gulp.task('build', function(done) {
  sequence(['clean', 'sync-config'], ['compile', 'docs'], done);
});

gulp.task('develop', function(done) {
  sequence('build', 'watch', done);
});

gulp.task('default', ['build']);
