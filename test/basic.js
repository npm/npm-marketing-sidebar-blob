var getblob = require('../')
var blobs = getblob.blobs
var t = require('tap')

t.notEqual(blobs.length, 0)

for (var i = 0; i < blobs.length; i++) {
  t.equal(blobs[i], getblob(i))
  t.notEqual(blobs[i].length, 0)
  t.notMatch(blobs[i], 'permisison')
  t.notMatch(blobs[i], 'Permisison')
  t.notMatch(blobs[i], /^###/)
  t.notMatch(blobs[i], '&bsp;')
  t.notMatch(blobs[i], /&nbsp[^;]/)
  t.notMatch(blobs[i], /[^&]nbsp;/)
  t.notMatch(blobs[i], /[^&]nbsp[^;]/)
  t.notMatch(blobs[i], 'Organiztions')
  t.notMatch(blobs[i], 'Orgainzations')
  t.match(blobs[i], /^<h3[ >]/)
  t.match(blobs[i], /<a /)
}

var saw = {}
for (i = 0; i < 1000; i++) {
  var b = getblob()
  var index = blobs.indexOf(b)
  if (index === -1) {
    throw new Error('found unknown blob')
  }
  saw[index] = true
  if (Object.keys(saw).length === blobs.length) {
    break
  }
}

for (i = 0; i < blobs.length; i++) {
  t.equal(saw[index], true, 'saw index ' + i)
}

var notANumber = 'x'
t.notEqual(blobs.indexOf(getblob(notANumber)), -1)
t.equal(getblob('1'), getblob(1))
