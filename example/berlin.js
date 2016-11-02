'use strict'

const toHTML = require('virtual-dom-stringify')

const map = require('..')

process.stdout.write(toHTML(map(13.34, 52.54)))
