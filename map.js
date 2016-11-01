'use strict'

const data = require('./data.json')
const toVdom = require('vdom-as-json/fromJson')

const symbol = toVdom(data)

module.exports = symbol
