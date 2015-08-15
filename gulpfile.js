var gulp = require('gulp');
var gutil = require('gulp-util');
var bloc = require('blockapps-js');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var conf = require('./package.json');
var path = require('path');
var fs = require('fs');

var blocConf = conf.bloc;

function compileSol (file) {
	var filePath = path.parse(file.path);
	var filename = filePath.base;

	gutil.log('recompiling ', filename);
	bloc.Solidity(file.contents).compile(blocConf.apiURL, function(compiledCode){
		if(compiledCode.vmCode === undefined) {
			gutil.warn('error compiling ', filename);
		}
		var dest = path.normalize(path.join(blocConf.metaDest, filePath.name + '.json'));
		fs.writeFileSync(dest, JSON.stringify(compiledCode));
	});
}

gulp.task('default', function(cb){
	gulp.src('./dapp/contracts/**/*.sol')
		.pipe(plumber())
		.pipe(watch('./dapp/contracts/**/*.sol', compileSol))
		.on('end', cb);
});
