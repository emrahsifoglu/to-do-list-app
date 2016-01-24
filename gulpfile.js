var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');

var dependencies = [
    'react',
    'react-dom',
    'flux',
    'keymirror'
];
var scriptsCount = 0;

gulp.task('scripts', function () {
    bundleApp(false);
});

gulp.task('deploy', function (){
    bundleApp(true);
});

gulp.task('watch', function () {
    gulp.watch(['./src/js/**'], ['deploy']);
});

gulp.task('default', ['scripts', 'watch']);

function bundleApp(isProduction) {
    scriptsCount++;
    var appBundler = browserify({
        entries: './src/js/App.jsx',
        extensions: ['.jsx'],
        transform: [babelify.configure({
            presets: ["es2015", "react"]
        })],
        debug: true
    });

    if (!isProduction && scriptsCount === 1){
        browserify({
            require: dependencies,
            debug: true
        })
            .bundle()
            .on('error', gutil.log)
            .pipe(source('vendors.js'))
            .pipe(gulp.dest('./public/js'));
    }
    if (!isProduction){
        dependencies.forEach(function(dep){
            appBundler.external(dep);
        })
    }

    appBundler
        .bundle()
        .on('error',gutil.log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/js'));
}
