var gulp = require('gulp')

gulp.task('sayHello', function () {
  console.log('Hello World')
})

gulp.task('buildFonts', function(){
  // return gulp.src(['./node_modules/pdfmake/examples/fonts/*.*'])
  // // return gulp.src(['./node_modules/pdfmake/examples/fonts/*.*'])
  // .pipe(each( function (content, file, callback){
  //   var newContent = Buffer.from(content).toString('base64');
  //   callback(null, newContent);
  // }, 'buffer'))
  // .pipe(fc2json('vfs_fonts.js', {flat: true}))
  // .pipe(each( function (content, file, callback){
  //   var newContent = vfsBefore + content + vfsAfter;
  //   callback(null, newContent)
  // },'buffer' ))
  // .pipe(gulp.dest('build'));

})


