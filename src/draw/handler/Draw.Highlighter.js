L.Draw.Highlighter = L.Draw.Pen.extend({
    statics: {
        TYPE: 'highlighter'
    },

    options:{
        opacity:.5,
        clickable:true
    },
    initialize:function(map, options) {

        this._initialLabelText = L.drawLocal.draw.handlers.line.tooltip.start;
        L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
        this.type = L.Draw.Highlighter.TYPE;
    },

    _drawShape:function(e) {
        if(this._shape){
            this._shape.latlngs.push(e);
            this._shape.redraw();
        }
        else {
            this._shape = new L.Highlighter([e], this._makeShapeOptions());
            this._map.addLayer(this._shape);
        }
    },
    _fireCreatedEvent:function() {
        var e = new L.Highlighter(this._shape.latlngs, this._makeShapeOptions());
        L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, e);
    }
});