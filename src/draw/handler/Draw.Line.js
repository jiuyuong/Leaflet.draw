/**
 * Created by jiuyuong on 2016/8/11.
 */
L.Draw.Line = L.Draw.SimpleShape.extend({
    statics: {
        TYPE: 'line'
    },

    options:{
        shapeOptions: {
            stroke: true,
            weight: 2,
            opacity: 1,
            fill: false,
            clickable: true
        }
    },
    initialize:function(map, options) {
        this.type = L.Draw.Line.TYPE;
        this._initialLabelText = L.drawLocal.draw.handlers.line.tooltip.start;
        L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
    },
    _drawShape:function(e) {
        if(this._shape)
            this._shape.setEndpoints(this._startLatLng, e)
        else {
            this._shape = new L.Line(this._startLatLng, e, this._makeShapeOptions());
            this._map.addLayer(this._shape);
        }

    },
    _fireCreatedEvent:function() {
        var e = new L.Line(this._startLatLng, this._shape._end, this._makeShapeOptions());
        L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, e);
    },
    _makeShapeOptions:function(){
        return this.options.shapeOptions;
    }
});