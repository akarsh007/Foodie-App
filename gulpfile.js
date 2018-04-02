var gulp       = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var svgSprite = require("gulp-svg-sprites");
var filter    = require('gulp-filter');
var clean = require("gulp-clean");
var config = {
    mode: "sprite",
    selector: "ico-%f",
    common: 'ico',
    templates: {
        css: require("fs").readFileSync("./src/assets/sprite/tmpl/sprite.css", "utf-8")
    },
    cssFile: 'scss/_sprite.scss', //'css/sprite.css' give outfile in scss/css
    svg: {
        sprite: 'images/sprite.svg' //output sprite name
    },
    preview: {
        sprite: "sprite-preview.html"
    },
    baseSize: 16
};
gulp.task("clean:output", function() {
    return gulp.src("./src/assets/sprite/sprite-output", {read: false})
        .pipe(clean());
});

gulp.task('sprite:scss', ["clean:output"], function() {

    return gulp.src('./src/assets/svg/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest("./src/assets/sprite/sprite-output/")) //output everything
        .pipe(filter('**/*.svg'))  // Filter out everything except the SVG file
        // .pipe(svg2png())           // Create a PNG
        .pipe(gulp.dest("./src/assets/sprite/sprite-output")); //only output sprite image
});

//Start local server
gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            host: '0.0.0.0',
            port: 3030,
            livereload: false,
            directoryListing: true,
            //hostname: '0.0.0.0',
            directoryListing: {
                enable:true,
                path: './src/mocks'
            },
            //fallback:   '/src/web/index.html',
            open: true
        }));
});
gulp.task('copyfiles', function() {
    // gulp.src('./src/assets/fonts/**/*.{ttf,woff,woff2,eot,svg}')
    //     .pipe(gulp.dest('./public/fonts/'));
    //

    gulp.src('./src/assets/sprite/sprite-output/image/sprite.svg')
        .pipe(gulp.dest('./public/images'));


});


//gulp.task('build', [ 'iconfont', 'compile-less', 'copyfiles']);
//gulp.task('default', ['compile-less', 'copyfiles', 'watch-less']);
gulp.task('start', [ 'sprite:scss','copyfiles','webserver'])
// gulp.task('dev',
//     [
//         'compile-less',
//         'copyfiles',
//         'watch-less',
//         'webserver'
//     ]
// );

