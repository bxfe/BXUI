'use strict'

const path = require('path')
const gulp = require('gulp')
const gulpUtil = require('gulp-util')
const through = require('through2')
const showdown = require('showdown')


function html2vue2(options) {
    const converter = new showdown.Converter()
    const script = `<script>\n\texport defualt {}\n</script>`
    return through.obj(function (file, encoding, cb) {
        let fileText = file.contents.toString()
        let html = converter.makeHtml(fileText)
        let template = `<template>\n\t<div>\n\t\t${html}\n\t</div>\n</template>`
        const fileHtml = [template, script].join('\n')

        file.contents = new Buffer(fileHtml)

        file.path = gulpUtil.replaceExtension(file.path, '.vue')

        this.push(file)

        cb()
    })

}


function gulpShowdown(options) {
    var converter = new showdown.Converter(options)

    return through.obj(function (file, encoding, cb) {
        var fileText = file.contents.toString()

        var fileHtml = converter.makeHtml(fileText)

        file.contents = new Buffer(fileHtml)

        file.path = gulpUtil.replaceExtension(file.path, '.html')

        this.push(file)

        cb(null)
    })
}
// function html2vue() {
//     const script = `<script>\n\texport defualt {}\n</script>`
//     return through.obj(function (file, encoding, cb) {
//         let html = file.contents.toString()
//         let template = `<template>\n\t<div>\n\t\t${html}\n\t</div>\n</template>`
//         const fileHtml = [template, script].join('\n')
//         file.contents = new Buffer(fileHtml)
//         file.path = gulpUtil.replaceExtension(file.path, '.vue')
//         this.push(file)
//         console.log(file.path)
//         cb()
//     })
// }

gulp.task('md2html', function() {
  gulp.src('md/*.md')
    .pipe(gulpShowdown())
    .pipe(html2vue())
    //.pipe(html2vue2())
    .pipe(gulp.dest('src/component'))
})
