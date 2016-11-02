'use strict'

const h = require('virtual-dom/h')

const {top, left, bottom, right, width, height} = require('./meta.json')
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
	pin, width: 1000, sizeOfPin: 8
}

const render = (lon, lat, opt = {}) => {
	opt = Object.assign({}, defaults, opt)

	const pinHeight = opt.sizeOfPin
	const pinWidth = pinRatio * pinHeight
	let [pinX, pinY] = projection([lon, lat])
	pinY -= pinHeight
	pinX -= pinWidth / 2

	return h('svg', {
		xmlns: 'http://www.w3.org/2000/svg',
		'xmlns:xlink': 'http://www.w3.org/1999/xlink',
		width: (width * 10) + '', height: (height * 10) + '',
		viewBox: [left, top, width, height].join(',')
	}, map.concat([
		h('defs', {}, [opt.pin]),
		h('use', {
			'xlink:href': '#pin', href: '#pin',
			x: pinX + '', y: pinY + '',
			width: pinWidth + '', height: pinHeight + ''
		})
	]))
}

module.exports = render

// const svg = h('svg', {
//     width: 600,
// 	height: Math.abs(height) / Math.abs(width) * 600,
//     viewBox: [left, top, width, height].join(',')
// }, polylines)
// process.stdout.write(toHTML(svg))
