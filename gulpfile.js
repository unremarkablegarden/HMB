var gulp = require('gulp');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
	// browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
};

var paths = {
	// 'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json'],
	'style': {
		// all: './public/styles/**/*.scss',
		site: './public/styles/site.scss',
		output: './public/styles/'
	},
	'js': {
		// all: '/public/js/**/*.js',
		list: [
			'./public/js/ratchet/standalone-fix.js',
			// './public/js/jquery/jquery-2.2.4.min.js',
			// './public/js/ratchet/ratchet.min.js',
			'./public/js/addtohomescreen/addtohomescreen.min.js',
			// './public/js/js-cookie/js-cookie.js',
			'./public/js/engine.js',
      './public/js/pw.js',
      './public/js/lock.js'
		],
		output: './public/js/'
	}
};


gulp.task('watch:sass', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', function(){
	gulp.src(paths.style.site)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(cleanCSS())
		.pipe(gulp.dest(paths.style.output));
});

gulp.task('js', function() {
  gulp.src(paths.js.list, { base: paths.js.output })
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.output));
});

gulp.task('runKeystone', shell.task('node keystone2-local.js'));

gulp.task('watch', [
  'watch:sass',
]);

gulp.task('default', ['watch', 'js', 'runKeystone']);
// gulp.task('default', ['sass', 'js']);
