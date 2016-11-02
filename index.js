'use strict'

const h = require('virtual-dom/h')

const meta = require('./meta.json')
const map = require('./map')
const projection = require('./projection')



const pinRatio = 5 / 8
const pin = h('symbol', {id: 'pin', viewBox: '0 0 5 8'}, [
    h('ellipse', {
    	rx: '.5', ry: '.3',
    	cy: '7.7', cx: '2.5',
    	fill: '#555'
    }),
    h('path', {
    	d: 'M2.5 7.7 L 4.665 3.75 A 2.5 2.5 0 1 0 0.335 3.75 L 2.5 7.7',
    	fill: '#cd4646'
    }),
    h('circle', {r: '.9', cy: '2.5', cx: '2.5', fill: 'black'})
])



const defaults = {
	ocean: '#8df', // color of the ocean
	land: 'white', // color of the land
	mapWidth: 500, // width of the `<svg>`
	pin, // virtual dom node with the pin
	pinHeight: 8 // relative to map viewBox
}

const render = (lon, lat, opt = {}) => {
	opt = Object.assign({}, defaults, opt)

	const mapWidth = opt.mapWidth
	const mapHeight = mapWidth * meta.height / meta.width

	const pinHeight = opt.pinHeight
	const pinWidth = pinRatio * pinHeight
	let [pinX, pinY] = projection([lon, lat])
	pinY -= pinHeight
	pinX -= pinWidth / 2

	return h('svg', {
		xmlns: 'http://www.w3.org/2000/svg',
		'xmlns:xlink': 'http://www.w3.org/1999/xlink',
		width: mapWidth + '', height: mapHeight + '',
		viewBox: [meta.left, meta.top, meta.width, meta.height].join(',')
	}, [].concat(
		h('style', {}, `
			.country {
				fill: ${opt.land};
				stroke: #555;
				stroke-width: .1;
			}
		`),
		h('rect', {
			width: mapWidth + '', height: mapHeight + '',
			fill: opt.ocean
		}),
		map,
		h('defs', {}, [opt.pin]),
		h('use', {
			'xlink:href': '#pin', href: '#pin',
			x: pinX + '', y: pinY + '',
			width: pinWidth + '', height: pinHeight + ''
		})
	))
}

module.exports = render

// const svg = h('svg', {
//     width: 600,
// 	height: Math.abs(height) / Math.abs(width) * 600,
//     viewBox: [left, top, width, height].join(',')
// }, polylines)
// process.stdout.write(toHTML(svg))
