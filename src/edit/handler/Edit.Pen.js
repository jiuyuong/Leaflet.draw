L.Edit.Pen = L.Edit.SimpleShape.extend({
    _move:function(e) {
        var latlngs = this._shape.latlngs,
            bounds = this._shape.getBounds(),
            center = bounds.getCenter(),
            newLatlngs = [], r = 0, offset;
        for (var l = latlngs.length; l > r; r++) {
            offset = [ latlngs[r].lat - center.lat, latlngs[r].lng - center.lng ];
            newLatlngs.push(new L.LatLng(e.lat + offset[0], e.lng + offset[1]))
        };
        this._shape.latlngs = newLatlngs;
        this._shape.redraw();
    }
});
L.Pen.addInitHook(function () {
    this.editing = new L.Edit.Pen(this);
    if(this.options.editable)
        this.editing.enable();
});