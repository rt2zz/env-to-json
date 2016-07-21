var e2j = require('../src/')

e2j.jsonToEnv(__dirname + '/test.json', __dirname + '/test.env', function (err, data) {
  console.log('err data', err, data)
})
