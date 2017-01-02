'use strict'

const fs = require('fs')
const path = require('path')
const toHTML = require('virtual-dom-stringify')
const disparity = require('disparity')

const map = require('.')
const fixture = fs.readFileSync(path.join(__dirname, 'example/berlin.svg'), 'utf8')

const assertEqualString = (a, b) => {
	if (a === b) return
	process.stdout.write(disparity.chars(a, b) + '\n')
	process.exit(1)
}



const generated = toHTML(map(13.34, 52.54))

assertEqualString(generated, fixture)
