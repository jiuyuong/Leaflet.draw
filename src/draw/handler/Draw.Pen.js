L.Draw.Pen = L.Draw.SimpleShape.extend({
    statics: {
        TYPE: 'pen'
    },
    initialize:function(map, options) {

        this._initialLabelText = L.drawLocal.draw.handlers.line.tooltip.start;
        L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
        this.type = L.Draw.Pen.TYPE;
    },

    _drawShape:function(e) {
        if(this._shape){
            this._shape.latlngs.push(e);
            this._shape.redraw();
        }
        else {
            this._shape = new L.Pen([e], this._makeShapeOptions());
            this._map.addLayer(this._shape);
        }
    },
    _fireCreatedEvent:function() {
        var e = new L.Pen(this._shape.latlngs, this._makeShapeOptions());
        L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, e);
    },
    _makeShapeOptions:function(){
        return this.options.shapeOptions;
    }
})