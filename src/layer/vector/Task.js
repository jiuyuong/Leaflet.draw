/**
 * Created by jiuyuong on 2016/8/14.
 */
L.Task = L.CircleMarker.extend({
    options:{
        text:'TA',
        radius:16
    },
    _updatePath: function () {
        this._renderer._updateCircle(this);
        this._renderer._updateText(this);
    },
    getBounds: function () {
        var half = [this._radius, this._radius];

        return new L.LatLngBounds(
            this._map.layerPointToLatLng(this._point.subtract(half)),
            this._map.layerPointToLatLng(this._point.add(half)));
    },
});