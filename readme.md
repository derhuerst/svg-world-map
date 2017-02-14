# [svg-world-map](http://jannisr.de/svg-world-map/)

**Render a world map with a pin at a specific location.** Fiddle with it on [the website](http://jannisr.de/svg-world-map/).

![map with pin at Berlin](https://rawgit.com/derhuerst/svg-world-map/master/example/berlin.svg)

[![npm version](https://img.shields.io/npm/v/svg-world-map.svg)](https://www.npmjs.com/package/svg-world-map)
[![build status](https://img.shields.io/travis/derhuerst/svg-world-map.svg)](https://travis-ci.org/derhuerst/svg-world-map)
[![dependency status](https://img.shields.io/david/derhuerst/svg-world-map.svg)](https://david-dm.org/derhuerst/svg-world-map)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/svg-world-map.svg)](https://david-dm.org/derhuerst/svg-world-map#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/svg-world-map.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)

`svg-world-map` returns a [virtual-dom](https://github.com/Matt-Esch/virtual-dom#dom-model) `<svg>` node. You can either stringify it into a file or embed it into your Frontend stack.

Note that because shapes of all countries are quite a lot of data, this module weighs **roughly `43k`** when [browserified](http://browserify.org), [minified](https://github.com/mishoo/UglifyJS2#uglifyjs-2) and gzipped.


## Installing

```shell
npm install svg-world-map
```


## Usage

```js
const map = require('svg-world-map')
const stringify = require('virtual-dom-stringify')

const myMap = map(81.8, 28.4) // Nepal

process.stdout.write(stringify(myMap))
```


## API

```
maps(longitude, latitude, [opt])
```

`opt` is optional and has the following default values:

```js
const defaults = {
	ocean: '#8df', // color of the ocean
	land: 'white', // color of the land
	mapWidth: 500, // width of the `<svg>`
	pin, // virtual dom node with the pin
	pinHeight: 8 // relative to map viewBox
}
```


## See also

- [`svg-patterns`](https://github.com/derhuerst/svg-patterns) – Create SVG patterns programmatically to visualize data.
- [`svg-radar-chart`](https://github.com/derhuerst/svg-radar-chart) – A reusable radar chart in SVG.


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/svg-world-map/issues).
