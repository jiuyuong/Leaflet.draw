L.Draw.Cloud = L.Draw.Rectangle.extend({
    statics: {
        TYPE: 'cloud'
    },

    options: {
        shapeOptions: {
            fillColor: null, //same as color by default
            clickable: true,
            fill:false
        }
    },

    initialize: function (map, options) {

        this._initialLabelText = L.drawLocal.draw.handlers.rectangle.tooltip.start;

        L.Draw.Rectangle.prototype.initialize.call(this, map, options);
        this.type = L.Draw.Cloud.TYPE;
    },

    _drawShape: function (latlng) {
        if (!this._shape) {
            this._shape = new L.Cloud(new L.LatLngBounds(this._startLatLng, latlng), this.options.shapeOptions);
            this._map.addLayer(this._shape);
        } else {
            this._shape.setBounds(new L.LatLngBounds(this._startLatLng, latlng));
        }
    },

    _fireCreatedEvent: function () {
        var rectangle = new L.Cloud(this._shape.getBounds(), this.options.shapeOptions);
        L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, rectangle);
    }
});
