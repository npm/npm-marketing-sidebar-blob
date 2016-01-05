var fs = require('fs')
var marked = require('marked')
var raw = fs.readFileSync(__dirname + '/data.md', 'utf8')
var blobs = raw.trim().split(/\n\n/).map(function (blob) {
  return marked(blob)
})
var len = blobs.length

// return a random blob
module.exports = function () {
  return blobs[ Math.floor(Math.random() * len) ]
}
