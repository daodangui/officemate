var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var webserver = require("gulp-webserver");
var proxy = require('http-proxy-middleware');
var rename = require("gulp-rename"); //重新命名模块
var sass = require("gulp-ruby-sass"); //sass

gulp.task("compilesass",function(){
    sass("./sass/*.scss",{
        style : "expanded"
    }).pipe( gulp.dest("./css/"));
});

gulp.task("listen",function(){
    gulp.watch("./sass/*.scss",["compilesass"]);
});

gulp.task("webserver", function () {
    gulp.src('./')
        .pipe(
            webserver({
                host: 'localhost',
                port: 8000,
                livereload: true,
                directoryListing: {
                    enable: true,
                    path: './'
                },
                middleware: [
                    proxy('/cart-get_like_goods.html',{
                        target : 'http://www.officemate.cn'
                    }),
                    proxy(['/dologin','/doregister','/docart'],{
                        target : 'http://localhost:8080/officemateGit/'
                    })
                ]
            })
        )
});

gulp.task('default', ["webserver","listen"], function () {});