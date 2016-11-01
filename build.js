'use strict'

const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const svgify = require('geojson-svgify')
const bbox = require('@turf/bbox')
const simplify = require('@turf/simplify')
const h = require('virtual-hyperscript-svg')
const toJSON = require('vdom-as-json/toJson')

const projection = require('./projection')



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

	const [west, _, east, north] = bbox(res)
	const south = -39
	const box = bboxPolygon([west, south, east, north])

	const world = simplify(res, .17, true)
	const polylines = svgify(world, {projection})

	const [left, top] = projection([west, north])
	const [right, bottom] = projection([east, south])
	const width = right - left
	const height = bottom - top
	const ratio = width / height

	const data = toJSON(polylines)
	const meta = {left, top, right, bottom, width, height}

	return Promise.all([write('data.json', data), write('meta.json', meta)])

})
.catch((err) => {
	console.error(err.stack)
	process.exit(1)
})
