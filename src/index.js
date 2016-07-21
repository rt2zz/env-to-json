'use strict'

let fs = require('fs')
let _ = require('lodash')

function envStringToObject(envString) {
  let lines = envString.split('\n')
  let obj = {}
  let splitLines = lines.map((line) => {
    let parts = line.trim().split('=')
    obj[parts[0]] = parts[1]
  })
  return obj
}

function jsonStringToObject(jsonString) {
  return JSON.parse(jsonString)
}

function objToEnvString(obj) {
  return _.map(obj, (value, key) => `${key}=${value}`).join('\n')
}

module.exports = {

  envToJson: function(inputPath, outputPath, cb) {
    fs.readFile(inputPath, (err, data) => {
      if (err) throw err
      let obj = envStringToObject(data.toString())
      fs.writeFile(outputPath, JSON.stringify(obj, null, 2), (err, data) => {
        if (err) throw err
        cb && cb(null, data)
      })
    })
  },

  jsonToEnv: function (inputPath, outputPath, cb) {
    fs.readFile(inputPath, (err, data) => {
      if (err) throw err
      let obj = jsonStringToObject(data.toString())
      let envString = objToEnvString(obj)
      fs.writeFile(outputPath, envString, (err, data) => {
        if (err) throw err
        cb && cb(null, data)
      })
    })
  }
}
