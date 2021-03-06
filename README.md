# @mapbox/mapbox-gl-draw

Modified to support use inside react-map-gl

Example:
```javascript
//@flow
import React from 'react';
import ReactMapGL from 'react-map-gl';

type Props {
  viewport: {
    latitude: number,
    longitude: number,
    zoom: number,
    bearing?: number,
    pitch?: number
  }
}

type State {
  dragPan: boolean
}

export default class MapWithDrawTools extends React.Component<Props, State> {

  props: Props

  state: {
    dragPan: true
  }

reactMapLoaded(map){
  var _this = this;
  const draw = new MapboxDraw({...});

  draw.setEventManager(
    this.refs.reactMapGl._eventManager, this.refs.reactMapGl._eventCanvas,
    ()=>{
      //function that returns the view props
      return _this.props.viewport;
    },
    (dragPan)=>{
      _this.toggleDragPan(dragPan);
    },
    (cursor) =>{
      //optionally override the default cursor choices
      //To do so, set the pointer style on eventContainer
    }
  );

  this.drawControlContainer = draw.onAdd(map);
  document.getElementById('draw-controls').appendChild(this.drawControlContainer);

  this.draw = draw;
  this.map = map;

  //now use draw and map as you normally would  

  map.on('draw.create', () => {

  });

  map.on('draw.update', () => {

  });

  map.on('draw.delete', () => {

  });

}

componentWillUnMount(){
  this.draw.onRemove();
}

//needed to disable dragPan when dragging features or vertices in mapbox-gl-draw
toggleDragPan(dragPan){
  this.setState({dragPan});
}

render(){
  return (
    <div style={{position: 'relative'}}>
    <ReactMapGL ref="reactGLMap"
    dragPan={this.state.dragPan} 
    onLoad={this.reactMapLoaded} />
    <div id="draw-controls" style={{position: 'absolute', top: 0, right: '25px'}}>
  )
}
}

```


[![Greenkeeper badge](https://badges.greenkeeper.io/mapbox/mapbox-gl-draw.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.org/mapbox/mapbox-gl-draw.svg?branch=master)](https://travis-ci.org/mapbox/mapbox-gl-draw)

Adds support for drawing and editing features on [mapbox-gl.js](https://www.mapbox.com/mapbox-gl-js/) maps. [See a live example here](https://www.mapbox.com/mapbox-gl-js/example/mapbox-gl-draw/)

**Requires [mapbox-gl-js](https://github.com/mapbox/mapbox-gl-js). Compatible versions are documented in the package.json**

**On NPM this package has recently moved from `mapbox-gl-draw` to `@mapbox/mapbox-gl-draw`**

### Installing

```
npm install @mapbox/mapbox-gl-draw
```

Draw ships with CSS, make sure you include it in your build. It can be found on our CDN or at `require('mapbox-gl-draw/dist/mapbox-gl-draw.css')`.

```html
<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v0.19.0/mapbox-gl-draw.css' type='text/css' />
```

### Usage in your application

**When using modules**

```js
var mapboxgl = require('mapbox-gl');
var MapboxDraw = require('@mapbox/mapbox-gl-draw');
```

**When using a CDN**

```html
<script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v0.19.0/mapbox-gl-draw.js'></script>
```

**Example setup**

```js
mapboxgl.accessToken = 'YOUR_ACCESS_TOKEN';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v8',
  center: [40, -74.50],
  zoom: 9
});

var Draw = new MapboxDraw();

map.addControl(Draw)

map.on('load', function() {
  // ALL YOUR APPLICATION CODE
});
```

https://www.mapbox.com/mapbox-gl-js/example/mapbox-gl-draw/

### See [API.md](https://github.com/mapbox/mapbox-gl-draw/blob/master/docs/API.md) for complete reference.

### Enhancements and New Interactions

For additional functionality [check out our list of custom modes](https://github.com/mapbox/mapbox-gl-draw/blob/master/docs/MODES.md#available-custom-modes).

Mapbox Draw accepts functionality changes after the functionality has been proven out via a [custom mode](https://github.com/mapbox/mapbox-gl-draw/blob/master/docs/MODES.md#creating-modes-for-mapbox-draw). This lets users experiment and validate their mode before entering a review process, hopefully promoting innovation. When you write a custom mode, please open a PR adding it to our [list of custom modes](https://github.com/mapbox/mapbox-gl-draw/blob/master/docs/MODES.md#available-custom-modes).

### Developing and testing

Install dependencies, build the source files and crank up a server via:

```
git clone git@github.com:mapbox/mapbox-gl-draw.git
npm install
npm start & open http://localhost:9966/debug/?access_token=<token>
```

### Testing

```
npm run test
```

### Publishing

To github and npm

```
npm version (major|minor|patch)
git push --tags
git push
npm publish
```

Update the version number in [the GL JS example](https://github.com/mapbox/mapbox-gl-js/blob/mb-pages/docs/_posts/examples/3400-01-25-mapbox-gl-draw.html).

### Naming actions

We're trying to follow standards when naming things. Here is a collection of links where we look for inspiration.

- http://turfjs.org/docs.html
- http://toblerity.org/shapely/manual.html
