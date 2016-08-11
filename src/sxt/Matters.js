/**
 * Created by jiuyuong on 2016/8/11.
 */
L.Matters = L.Evented.extend({
    options:{
        map:{
            
            options:{
                center: new L.LatLng(-37.7772, 175.2756),
                zoom: 15
            }
        },
        draw:{
            options: {
                position: 'topright'
            }
        }
    },
    initialize:function (options) {
        this.options.map.options.layers = [L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: false})];
        var map,mapOptions = L.setOptions(this.options.map, options.map);
        map = this._map = new L.Map(options.map.el, mapOptions);
        var sheetGroup = L.sheetGroup();
        map.addLayer(sheetGroup);

        var drawControl = new L.Control.Draw(L.setOptions(this.options.draw,options.draw));
        map.addControl(drawControl);

        map.on('draw:created', function (e) {
            var type = e.layerType,
                layer = e.layer;
            if (type === 'marker') {
                layer.bindPopup('A popup!');
            }
            layer.on('click',function () {
                layer.edit();
            })
            sheetGroup.addLayer(layer);
        });
        map.on('draw:edited', function (e) {

        });
    }
});

L.matters = function (options) {
    return new L.Matters(options);
}