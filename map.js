'use strict'

const data = require('./data.json')
const toVdom = require('vdom-as-json/fromJson')

const map = toVdom(data)

module.exports = map
