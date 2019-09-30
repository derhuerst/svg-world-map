'use strict'

const stringify = require('vdom-to-html')
const map = require('..')



const lat = document.querySelector('#lat')
const lon = document.querySelector('#lon')
const demo = document.querySelector('#demo')

const render = () => {
	const data = 'data:image/svg+xml,' +
		encodeURIComponent(stringify(map(+lon.value, +lat.value, {ocean: 'transparent'})))
	demo.innerHTML = `<img src="${data}"/>`
}

lat.addEventListener('change', render)
lon.addEventListener('change', render)
setTimeout(render, 0)
