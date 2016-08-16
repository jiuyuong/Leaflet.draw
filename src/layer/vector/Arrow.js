/**
 * Created by jiuyuong on 2016/8/11.
 */
L.Arrow = L.Line.extend({
    initialize:function(start, end, options) {
        L.Line.prototype.initialize.call(this, start, end, options);
        this.arrowBounds = new L.LatLngBounds(new L.LatLng(.0055, .0055), new L.LatLng(0, 0));
    },
    options:{
        fill:true
    },
    fillable:function() {
        return true;
    },
    _project:function() {
        L.Line.prototype._project.call(this);
        var e = this._map.latLngToLayerPoint(this.arrowBounds.getSouthWest()),
            t = this._map.latLngToLayerPoint(this.arrowBounds.getNorthEast());
        this._arrHeadWidth = Math.abs(e.x - t.x);
        this._arrHeadLen = Math.abs(e.y - t.y);
        var start = this._startPoint,
            end = this._endPoint,
            headLen = Math.min(this._arrHeadLen,10),
            headWidth = Math.min(this._arrHeadWidth,10),
            n = Math.atan2(start.y - end.y, start.x - end.x),
            a = Math.cos(n),
            r = Math.sin(n)

        /*this._parts = [
            [this._startPoint,this._endPoint],
            [new L.point(end.x+(headLen * a - headWidth / 2 * r),end.y + (headLen * r + headWidth / 2 * a)),end],
            [new L.point(end.x + (headLen * a + headWidth / 2 * r),end.y - (headWidth / 2 * a - headLen * r)),end]
        ];*/
        this._parts = [
            [this._startPoint,this._endPoint],
            [end, new L.point(end.x+(headLen * a - headWidth / 2 * r),end.y + (headLen * r + headWidth / 2 * a)),new L.point(end.x + (headLen * a + headWidth / 2 * r),end.y - (headWidth / 2 * a - headLen * r)),end]
        ];
    }
});
