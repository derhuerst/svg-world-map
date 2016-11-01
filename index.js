'use strict'

const h = require('virtual-dom/h')

const {top, left, bottom, right, width, height} = require('./meta.json')
const map = require('./map')
const projection = require('./projection')



const pin = h('symbol', {id: 'pin', viewBox: '0,0,1100,1900'}, [
	h('p', {
		fill: '#dd5656',
		d: 'M557 1710c-39-191-107-349-190-496-61-109-133-209-198-315-22-35-41-72-62-109'
		+ 'a498 498 0 0 1 3-532 517 517 0 0 1 363-236c136-20 263 14 353 67'
		+ 'a510 510 0 0 1 232 582c-13 43-34 79-53 118-36 76-82 145-127 215-137'
		+ ' 206-265 417-321 706z'
	}),
    h('circle', {r: '183', cx: '560', cy: '490', fill: 'black'})
])



const defaults = {pin, width: 1000}

const render = (lon, lat, opt = {}) => {
	opt = Object.assign({}, defaults, opt)
	const [x, y] = projection([lon, lat])

	return h('svg', {
		xmlns: 'http://www.w3.org/2000/svg',
		'xmlns:xlink': 'http://www.w3.org/1999/xlink',
		width: (width * 10) + '', height: (height * 10) + '',
		viewBox: [left, top, width, height].join(',')
	}, [
		// h('defs', {}, [opt.pin]),
		h('circle', {
			cx: x + '', cy: y + '', r: '.2', fill: 'red'
		})
		// h('use', {
		// 	'xlink:href': '#pin', href: '#pin',
		// 	x: x + '', y: y + '', width: '55'
		// })
	].concat(map))
}

module.exports = render

// const svg = h('svg', {
//     width: 600,
// 	height: Math.abs(height) / Math.abs(width) * 600,
//     viewBox: [left, top, width, height].join(',')
// }, polylines)
// process.stdout.write(toHTML(svg))
