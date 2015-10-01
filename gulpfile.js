var gulp = require("gulp"),
	del = require("del"),
	concat = require('gulp-concat'),
	wrap = require("gulp-wrap"),
	speck = require('gulp-speckjs');

var JS_DEPS = [
	'bower_components/Proton/build/proton-1.0.0.js'
];

gulp.task('clean', function(cb) {
	del(['./build/**/*'])
		.then(function (paths) {
    	cb();
		});
});

gulp.task('build.source', ['clean'], function() { 
	gulp.src("./src/**/*.js")
    .pipe(wrap({ src: './wrapper.js'}))
    .pipe(concat("contagion.js"))
    .pipe(gulp.dest("./build"));
});

gulp.task('build.vendor', ['clean'], function() { 
	gulp.src(JS_DEPS)
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest("./build"));
});

gulp.task('build.example', ['clean'], function() { 
	gulp.src("./example/**/*")
    .pipe(gulp.dest("./build"));
});

// gulp.task('speck:tape', function() {
//   return gulp.src('./test/fixtures/*.js')
//     .pipe(foreach(function(stream, file) {
//       return stream
//         .pipe(speck({
//           testFW: 'tape',
//           logs: true,
//           relPath: './specs/' + path.basename(file.path)
//         }))
//         .pipe(rename({
//           suffix : '_tapeSpec'
//         }));
//     }))
//     .pipe(gulp.dest('./test/fixtures/specs'));
// });

gulp.task('build', ['clean', 'build.source', 'build.vendor', 'build.example']);

gulp.task('serve', ['build'], function() {
	var server = require('node-http-server');

	server.deploy({
    port: 9010,
    root: process.env.PWD + '/build/'
  });
});

gulp.task('default', ['serve']);