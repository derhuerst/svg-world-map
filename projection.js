'use strict'

const mercator = require('projections/mercator')

const round = (x, n = 5) =>
	Math.round(x * Math.pow(10, n)) / Math.pow(10, n)

const projection = ([lon, lat]) => {
	const {x, y} = mercator({lon, lat}, {latLimit: 80})
	return [round(x * 100, 3), round(y * 100, 3)]
}

module.exports = projection
