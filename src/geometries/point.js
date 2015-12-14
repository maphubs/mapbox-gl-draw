'use strict';

import Geometry from './geometry';
import InternalEvents from '../internal_events';

/**
 * Point geometry class
 *
 * @param {Object} options
 * @param {Map} options.map - Instance of MaboxGL Map
 * @param {Object} [options.data] - GeoJSON feature
 * @returns {Point} this
 */
export default class Point extends Geometry {

  constructor(options) {
    if (!options.data) {
      options.data = {
        geometry: {
          coordinates: [0, 0]
        }
      };
    }
    options.type = 'Point';
    super(options);
    this.type = 'point';
    this.completeDraw = this._completeDraw.bind(this);
  }

  startDraw() {
    InternalEvents.emit('drawing.start', { featureType: 'point' });
    this._map.getContainer().classList.add('mapboxgl-draw-activated');
    this._map.on('click', this.completeDraw);
  }

  _completeDraw(e) {
    this._map.getContainer().classList.remove('mapboxgl-draw-activated');
    this._map.off('click', this.completeDraw);
    this.coordinates = [ e.lngLat.lng, e.lngLat.lat ];
    this._finishDrawing('point');
  }

}
