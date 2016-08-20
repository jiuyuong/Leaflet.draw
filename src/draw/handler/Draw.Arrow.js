/**
 * Created by jiuyuong on 2016/8/11.
 */
L.Draw.Arrow = L.Draw.SimpleShape.extend({
    statics: {
        TYPE: 'arrow'
    },

    options: {
        shapeOptions: {
            stroke: true,
            opacity: 1,
            fill: true,
            clickable: true
        }
    },
    initialize: function (map, options) {
        this.type = L.Draw.Arrow.TYPE;
        this._initialLabelText = L.drawLocal.draw.handlers.line.tooltip.start;
        L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
    },
    _drawShape: function (latlng) {
        if(this._shape){
            this._shape.setEndpoints(this._startLatLng, latlng) ;
        }
        else{
            this._shape = new L.Arrow(this._startLatLng, latlng, this._makeShapeOptions());
            this._map.addLayer(this._shape);
        }
    },
    _fireCreatedEvent: function () {
        var e = new L.Arrow(this._startLatLng, this._shape._end, this._makeShapeOptions());
        L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, e);
    },
    _makeShapeOptions: function (){
        return this.options.shapeOptions;
    }
});
