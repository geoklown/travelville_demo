import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import del from 'del';


const paths = {
    styles: {
        src: 'src/styles/css/*.*',
        dest: 'docs/styles/css'
    },
    scripts: {
        src: 'src/scripts/**/*.*',
        dest: 'docs/scripts/'
    },
    html:{
        src: 'src *.html',
        dest: 'docs/'
    }
};

/*
 * For small tasks you can export arrow functions
 */
export const clean = () => del([ 'docs/scripts', 'docs/styles' ]);

/*
 * You can also declare named functions and export them as tasks
 */
export function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(cleanCSS())
        // pass in options to the stream
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest));
}

export function scripts() {
    return gulp.src(paths.scripts.src, { sourcemaps: true })
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('main.min.scripts'))
        .pipe(gulp.dest(paths.scripts.dest));
}
export function html(){
    return gulp.src(paths.html.src)
        .pipe(rename('index.html'))
        .pipe(gulp.dest(paths.html.dest))
}

/*
 * You could even use `export as` to rename exported tasks
 */
function watchFiles() {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.html.src, html);
}


const build = gulp.series(clean, gulp.parallel(styles, scripts, html));
/*
 * Export a default task
 */
export default build;