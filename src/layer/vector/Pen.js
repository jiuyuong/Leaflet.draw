L.Pen = L.Path.extend({
    initialize:function(latlngs, options) {
        this.latlngs = latlngs;
        L.setOptions(this,options);
    },
    _project:function() {
        var self = this;
        self._parts = [
            self.latlngs.map(function (latlng) {
                return self._map.latLngToLayerPoint(latlng);
            })
        ];
    },
    getLatLngs: function () {
        return this.latlngs;
    },
    getBounds:function() {
        return new L.LatLngBounds(this.latlngs);
    },
    _update:function() {
        this._renderer._updatePoly(this);
    }
});