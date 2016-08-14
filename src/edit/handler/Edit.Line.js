/**
 * Created by jiuyuong on 2016/8/11.
 */
L.Edit.Line = L.Edit.Rectangle.extend({
    _onMarkerDragStart:function(e) {
        L.Edit.SimpleShape.prototype._onMarkerDragStart.call(this, e);
        var t = this._getCorners(),
            target = e.target,
            cornerIndex = target._cornerIndex;
        this._oppositeCorner = t[(cornerIndex + 1) % 2];
        this._toggleCornerMarkers(0, cornerIndex);
        //$(this._map._container).addClass("leaflet-drawing");
    },
    _onTouchStart: function (e) {
        //L.Edit.Rectangle.prototype._onMarkerDragStart.call(this, e);

        if (typeof(this._getCorners) === 'function') {
            // Save a reference to the opposite point
            var corners = this._getCorners(),
                marker = e.target,
                cornerIndex = marker._cornerIndex;
            marker.setOpacity(0);
            this._oppositeCorner = corners[(cornerIndex + 1) % 2];
            this._toggleCornerMarkers(0, cornerIndex);
        }

        this._shape.fire('editstart');
    },
    _onMarkerDragEnd:function(e) {
        L.Edit.Rectangle.prototype._onMarkerDragEnd.call(this, e);
        //$(this._map._container).removeClass("leaflet-drawing");
    },
    _getCenter:function() {
        var e = this._shape._start,
            t = this._shape._end,
            i = -(e.lat - t.lat) / 2,
            s = -(e.lng - t.lng) / 2;
        return new L.LatLng(e.lat + i, e.lng + s);
    },
    _move:function(e) {
        var start = this._shape._start,
            end = this._shape._end,
            center = this._getCenter(),
            ql = [ e.lat - center.lat, e.lng - center.lng ],
            newStart = new L.LatLng(start.lat + ql[0], start.lng + ql[1]),
            newEnd = new L.LatLng(end.lat + ql[0], end.lng + ql[1]);
        this._shape.setEndpoints(newStart, newEnd);
        this._repositionCornerMarkers();
        this._toggleCornerMarkers(true);
        //this._openPopover();
    },
    _resize:function(point) {
        /*			var t = this._getCorners(),
         target = e.target,
         cornerIndex = target._cornerIndex;
         this._oppositeCorner = t[(cornerIndex + 1) % 2];*/
        this._oppositeCorner == this._shape._start ?
            this._shape.setEndpoints(this._shape._start, point) :
            this._shape.setEndpoints(point, this._shape._end);
        var bounds = this._shape.getBounds();
        this._moveMarker && this._moveMarker.setLatLng(bounds.getCenter());
    },
    _getCorners:function() {
        return [ this._shape._start, this._shape._end ];
    },
    _createPopover:function() {
        L.Edit.SimpleShape.prototype._createPopover.call(this);
        var start = this._shape._start,
            end = this._shape._end,
            pos = start.lat < end.lat ?  start : end;
        this._shape.openPopup(pos);
    }
});
L.Line.addInitHook(function () {
    this.editing = new L.Edit.Line(this);
    this.options.editable && this.editing.enable();
});