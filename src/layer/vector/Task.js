/**
 * Created by jiuyuong on 2016/8/14.
 */
L.Task = L.CircleMarker.extend({
    options:{
        text:'TA'
    },
    _empty:function () {
      return false;
    },
    _project:function () {
        var map = this._map;
        this._radius = Math.pow(2,Math.max(Math.min(map.getZoom()-7,4),1));
        //console.log(this._radius);
        //this.options.string = this._radius<8 ?' ':null;
        this.options["font-size"] = this._radius -2 ;
        this._point = map.latLngToLayerPoint(this._latlng);
    },
    _updatePath: function () {
        this._renderer._updateCircle(this);
        this._renderer._updateTextStyle(this);
        this._renderer._updateText(this);
    },
    setStyle:function (style) {
        L.CircleMarker.prototype.setStyle.call(this,style);
        this._renderer._updateTextStyle(this);
    },
    getBounds: function () {
        var half = [this._radius, this._radius];

        return new L.LatLngBounds(
            this._map.layerPointToLatLng(this._point.subtract(half)),
            this._map.layerPointToLatLng(this._point.add(half)));
    },
});