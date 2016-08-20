L.Cloud = L.Rectangle.extend({
    initialize:function(map, options) {
        options = options || {};
        options.noClip = true;
        L.Rectangle.prototype.initialize.call(this, map, options);
    },
    _updatePath:function () {
        this._renderer._updateCloud(this);
    }
});