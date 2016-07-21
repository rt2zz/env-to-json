'use strict'

let program = require('commander')
let _ = require('lodash')
let e2j = require('../src/')

program
  .option('-i, --in [inputFile]', 'Input File')
  .option('-o, --out [outputFile]', 'Output File')
  .parse(process.argv)

let inputFile = program.in
let outputFile = program.out

let type = _.last(inputFile.split('.'))

if (type === 'json') {
  e2j.jsonToEnv(inputFile, outputFile)
} else if (type === 'env') {
  e2j.envToJson(inputFile, outputFile)
} else {
  throw new Error('unknown input file type')
}
