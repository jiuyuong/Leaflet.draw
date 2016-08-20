L.Highlighter = L.Pen.extend({
    options:{
        opacity:.5
    },
    _project:function() {
        L.Pen.prototype._project.call(this);
        var zoom = this._map.getZoom();
        this.setStyle({
            weight: Math.pow(2, zoom - 7)
        });
    }
})