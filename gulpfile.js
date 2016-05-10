var config = require('./gulpfile.config.js')();
var del = require('del');
var args = require('yargs').argv;
var gulp = require('gulp');
var browserSync = require('browser-sync');
var wiredep = require('wiredep').stream;
var $ = require('gulp-load-plugins')({lazy: true});


/** 
 **
 Build Tasks
 **
 **/
gulp.task('help', $.taskListing);

gulp.task('serve-dev', function (){

  var nodeOptions = {
    script: config['main'],
    delay: 1,
    env: {
      'PORT': config['port'],
      'NODE_ENV': 'development'
    },
    watch: config['server']
  }
  return $.nodemon(nodeOptions)
          .on('restart', [''], function () {
            setTimeout(function(){
              browserSync.reload({stream:false});
            }, 1000)
          })
          .on('start',   [''], function () {
            startBrowserSync()
          })
          .on('crash',   [''], function () {})
          .on('exit',    [''], function () {});

})


gulp.task('html', ['delete-html', 'script', 'style'], function (){

  var css = $.filter(['**/**.css'], {restore: true});
  var js = $.filter(['**/**.js'], {restore: true});
  var html = $.filter(['**/**.html'], {restore: true});


  gulp
    .src(config['html'])
    .pipe($.revReplace({manifest: gulp.src("./dist/js/rev-manifest.json")}))
    .pipe($.revReplace({manifest: gulp.src("./dist/css/rev-manifest.json")}))
    .pipe($.inject(gulp.src(config['vendor']['other'])))
    .pipe(wiredep(config['wiredep']))
    .pipe($.useref({searchPath: './'}))
    .pipe(css)
    .pipe($.if(args.production, $.csso()))
    .pipe($.if(args.production, $.rev()))
    .pipe(css.restore)
    .pipe(js)
    .pipe($.if(args.production, $.uglify()))
    .pipe($.if(args.production, $.rev()))
    .pipe(js.restore)
    .pipe($.if(args.verbose, $.print()))
    .pipe(html)
    .pipe($.if(args.production, $.htmlmin({collapseWhitespace: true})))
    .pipe(html.restore)
    .pipe($.if(args.production, $.revReplace()))
    .pipe(gulp.dest('dist'))

  del(['./dist/**/*manifest.json']);
  del(['./dist/js/lib.js']);
  del(['./dist/css/lib.css']);
  return
})

gulp.task('style', ['delete-css'], function () {
  return gulp
    .src(config['css'])
    .pipe($.if(args.verbose, $.print()))
    .pipe($.concat('styles.css'))
    .pipe($.plumber())
    .pipe($.if(args.production, $.csso()))
    .pipe($.if(args.production, $.rev()))
    .pipe(gulp.dest('dist/css'))
    .pipe($.if(args.production, $.rev.manifest()))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('script', ['delete-js'], function() {
  return gulp
    .src(config['js'])
    .pipe($.if(args.verbose, $.print()))
    .pipe($.concat('app.js'))
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.if(args.production, $.uglify()))
    .pipe($.if(args.production, $.rev()))
    .pipe(gulp.dest('dist/js'))
    .pipe($.if(args.production, $.rev.manifest()))
    .pipe(gulp.dest('dist/js'))
})



gulp.task('images', function (){
  return gulp
    .src(config['images'])
    .pipe($.if(args.verbose, $.print()))
    .pipe($.if(args.production, $.imagemin({optimizationLevel: 4})))
    .pipe(gulp.dest('dist/images'))
})



/** 
 **
 Browser Sync
 **
 **/
var startBrowserSync = function () {

  if (browserSync.active) return;

  var port = config.browserSync['port'] || 3000;
  console.log('Starting browser-sync on port ' + port);

  var options = {
    proxy: 'localhost:' + config['port'],
    port: port,
    files: config['dist'] + '**/*.*',
    ghostMode: {
      clicks: config.browserSync.ghostMode['clicks'] || false,
      location: config.browserSync.ghostMode['location'] || false,
      forms: config.browserSync.ghostMode['forms'] || false,
      scroll: config.browserSync.ghostMode['scroll'] || false
    },
    injectChanges: false,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 0 
  }

  browserSync(options);

  gulp.watch(config['css'], ['style']);
  gulp.watch(config['js'], ['script']);
  gulp.watch(config['html'], ['html']);
  gulp.watch(config['images'], ['images']);
}


/** 
 **
 Clean up
 **
 **/
gulp.task('delete-html', function (done){ del(['dist/**/*.html', '!dist/components/**/*', '!dist/static/**/*'], done)});
gulp.task('delete-css', function (done){ del(['dist/css/**/*.css', '!dist/css/lib.js'], done)});
gulp.task('delete-js', function (done){ del(['dist/js/**/*.js', '!dist/js/lib.js'], done)});


/** 
 **
 Main Gulp Tasks
 **
 **/
gulp.task('default', ['help']);
gulp.task('build', ['html', 'images']);
gulp.task('watch', ['serve-dev', 'build']);


