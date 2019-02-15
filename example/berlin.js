'use strict'

const toHTML = require('vdom-to-html')

const map = require('..')

process.stdout.write(toHTML(map(13.34, 52.54)))
