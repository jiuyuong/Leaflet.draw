/**
 * Created by jiuyuong on 2016/8/11.
 */
L.Line = L.DragPath.extend({
    initialize:function(start, end, options) {
        this._start = start;
        this._end = end;
    },
    options:{
        fillOpacity: 1
    },
    _project:function() {
        this._startPoint = this._map.latLngToLayerPoint(this._start);
        this._endPoint = this._map.latLngToLayerPoint(this._end);

        this._parts = [
            [this._startPoint,this._endPoint]
        ];
    },
    getLatLngs: function () {
        return [this._start,this._end];
    },
    getBounds:function() {
        return new L.LatLngBounds(this._start, this._end);
    },
    setEndpoints:function(start, end) {
        this._start = start, this._end = end, this.redraw();
    },
    _update:function() {
        this._renderer._updatePoly(this);
        /*if (!L.Browser.svg) return "";
        var s = this._startPoint,
            e = this._endPoint,
            str = "M" + s.x + "," + s.y;
        str += "L" + e.x + "," + e.y;
        return str;*/
    }
});