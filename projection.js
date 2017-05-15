'use strict'

const mercator = require('projections/mercator')

const projection = ([lon, lat]) => {
	const {x, y} = mercator({lon, lat}, {latLimit: 80})
	return [
		+(x * 100).toFixed(3),
		+(y * 100).toFixed(3)
	]
}

module.exports = projection
