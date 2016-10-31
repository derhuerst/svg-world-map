'use strict'

const mercator = require('projections/mercator')
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const svgify = require('geojson-svgify')
const bbox = require('@turf/bbox')
const simplify = require('@turf/simplify')
const h = require('virtual-hyperscript-svg')
const toJSON = require('vdom-as-json/toJson')



const round = (x, n = 5) =>
	Math.round(x * Math.pow(10, n)) / Math.pow(10, n)

const projection = ([lon, lat]) => {
	const {x, y} = mercator({lon, lat}, {latLimit: 80})
	return [round(x * 100, 3), round(y * 100, 3)]
}

const write = (filename, data) => {
	filename = path.join(__dirname, filename)
	data = JSON.stringify(data)
	return new Promise((yay, nay) => {
		fs.writeFile(filename, data, (err) => {
			if (err) nay(err)
			else yay()
		})
	})
}



fetch(`https://raw.githubusercontent.com/\
johan/world.geo.json/master/countries.geo.json`)
.then((res) => res.json())
.then((res) => {

	const world = simplify(res, .17, true)
	const [west, _, east, north] = bbox(world)
	const south = -39

	const polylines = svgify(world, {projection})

	const [left, top] = svgify.defaults.projection([west, north])
	const [right, bottom] = svgify.defaults.projection([east, south])
	const width = right - left
	const height = bottom - top
	const ratio = width / height

	const symbol = h('symbol', {
		id: 'world-map',
		viewBox: [left, top, width, height].join(',')
	}, polylines)

	const data = toJSON(symbol)
	const meta = {west, south, east, north, ratio}

	return Promise.all([write('data.json', data), write('meta.json', meta)])

})
.catch((err) => {
	console.error(err.stack)
	process.exit(1)
})
