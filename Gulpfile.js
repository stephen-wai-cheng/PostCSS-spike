var fs = require('fs');
var removeFolder = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(
    	function(file,index){
	      var curPath = path + "/" + file;
	      if(fs.lstatSync(curPath).isDirectory()) { // recurse
	        removeFolder(curPath);
	      } else { // delete file
	        fs.unlinkSync(curPath);
	      }
	    }
    );
    fs.rmdirSync(path);
  }
};
var destinationFolder = 'build';
removeFolder(destinationFolder);

var		gulp = require('gulp'),
		postcss = require('gulp-postcss'),
		gp_concat = require('gulp-concat'),
		gp_rename = require('gulp-rename'),
		gp_uglify = require('gulp-uglify'),
		cleanCSS = require('gulp-clean-css');

var postcssPlugins = [
	require('precss')(),
	require('autoprefixer')({ browsers: ['last 3 versions', 'ie 6-8', 'Firefox > 20']  })
];

gulp.task('css', function () {
    return gulp.src('src/css/**/*.css')
        .pipe(postcss(postcssPlugins))
        .pipe(gp_concat('concat.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(destinationFolder))
});

gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(gp_concat('concat.js'))
		.pipe(gp_rename('ugly.js'))
		.pipe(gp_uglify())
        .pipe(gulp.dest(destinationFolder))
});

gulp.task('default', ['css', 'js'], function(){});