//方法名
const gulp = require('gulp');
const fs = require('fs');
const glob = require('glob');
const fileinclude = require('gulp-file-include'); //html合并
const del = require('del'); //删除
const runSequence = require('run-sequence'); //控制多个任务进行顺序执行
const plumber = require('gulp-plumber'); //错误处理
const preprocess = require("gulp-preprocess"); //js模板处理
const stripDebug = require('gulp-strip-debug'); //去掉打印
const uglify = require('gulp-uglify'); //js压缩
const pump = require('pump'); //流连接
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
const minimist = require('minimist');//获取命令行参数
const timestamp = (new Date()).getTime();
//定义css、js源文件路径
var cssSrc = 'src/lib/css/*.css',
    jsSrc = 'src/lib/js/*.js';

gulp.task('clean', function() {
    return del.sync(['dest/**/**/**/**']);
});

//copy
gulp.task('copy', function() {
    return gulp.src(['src/lib/**/*','!src/lib/js/*.js'])
        .pipe(gulp.dest('./dest/lib'))
});
gulp.task('copy:ico', function() {
    return gulp.src('src/*.ico')
        .pipe(gulp.dest('./dest'))
});

// 测试环境
// html模板
gulp.task('fileinclude', function() {
    gulp.src(['src/**/*.html'])
        .pipe(plumber())
        .pipe(fileinclude({
            context: {
                name: 'dev',
                admain: 'https://bx.wts9999.net',
                topic: 'https://topic.wts9999.net',
                time: timestamp
            },
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dest'));
});
// js
gulp.task('js', function(cb) {
    pump([
            gulp.src('src/lib/js/*.js'),
            preprocess({ context: { NODE_ENV: '0'} }),
            gulp.dest('./dest/lib/js')
        ],
        cb
    );
});
//scss
gulp.task('sass', function() {
    gulp.src('./sass/main.scss')
        .pipe(plumber())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dest/lib/css'));
});

//正式环境
// html模板
gulp.task('fileinclude_build', function() {
    gulp.src(['src/**/*.html'])
        .pipe(plumber())
        .pipe(fileinclude({
            context: {
                name: 'build',
                admain: 'https://bx.wts999.com',
                topic: 'https://topic.wts999.com',
                time: timestamp
            },
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dest'));
});
//scss
gulp.task('sass_build', function() {
    gulp.src('./sass/main.scss')
        .pipe(plumber())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sass())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dest/lib/css'))
});
// js
gulp.task('js_build', function(cb) {
    pump([
            gulp.src('src/lib/js/*.js'),
            preprocess({ context: { NODE_ENV: '1'} }),
            stripDebug(),
            uglify(),
            gulp.dest('./dest/lib/js')
        ],
        cb
    );
});

gulp.task('task-dev', function() {
    runSequence(['sass', 'fileinclude', 'copy', 'copy:ico','js']);
});
gulp.task('task-build', function() {
    runSequence(['clean'], ['sass_build', 'fileinclude_build', 'copy', 'copy:ico','js_build']);
});

// Watchers
gulp.task('watch', function() {
    gulp.watch([
        'src/**/*.html',
        'src/**/*.htm',
        'src/lib/js/*.js',
        'sass/**/*.scss',
    ], ['task-dev']);
});

var options = minimist(process.argv.slice(2), {string: ["rev"]});
gulp.task('default', function(){
    runSequence('task-dev','watch');
}); //测试环境
gulp.task('build',function() {
    runSequence('task-build');
}); //正式环境

