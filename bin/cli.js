#!/usr/bin/env node
'use strict'

let cli = require('cli')
let pkg = require('../package.json')
let program = require('commander')
let updateNotifier = require('update-notifier')

let app = program
  .version(pkg.version)
  .command('convert', 'convert a file')

app.parse(process.argv)

// Error check for bad commands
const commandExists = app.commands.some(cmd => cmd._name == app.args[0])
if (app.args[0] && !commandExists) {
  cli.error('That\'s not a command!')
  app.outputHelp()
}

// Setup notifier for updates
const notifier = updateNotifier({pkg, lastUpdateCheck: 0, updateCheckInterval: 1000})
notifier.notify({defer: false})
