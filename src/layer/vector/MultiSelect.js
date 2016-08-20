/**
 * Created by jiuyuong on 2016/8/20.
 */
L.MultiSelect = L.Pen.extend({
    options:{
        color:"#aaaaaa",
        dashArray:"10, 7"
    },
    getRectObj:function(e) {
        var layers = this._map._layers[e],
            bounds = layers.getBounds();

        var rectangle = new L.Rectangle(bounds, this.options);
        rectangle._map = this._map;
        rectangle._initElements();
        rectangle._initEvents();
        rectangle.projectLatlngs();
        rectangle._updatePath();
        rectangle.fire("add");
        this._map.on({
            viewreset:rectangle.projectLatlngs,
            moveend:rectangle._updatePath
        }, rectangle);
        return rectangle;
    }
})