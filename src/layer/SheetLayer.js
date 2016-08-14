/**
 * Created by jiuyuong on 2016/8/12.
 */
L.SheetLayer = L.GridLayer.extend({
    initialize: function (url, options) { // (String, LatLngBounds, Object)
        this._url = url;
        L.setOptions(this, options);
        L.GridLayer.prototype.initialize.call(this,options);
        this.scale = 1;
        if (navigator.userAgent.match(/Android (\d+\.\d+)/)) {
            this.scale = 0.25;
        }

    },
    onAdd:function (map) {
        L.GridLayer.prototype.onAdd.call(this,map);
        map.fitBounds([[-.8, 0], [0, .8]]);
    },
    downloadImage:function (cb) {
        var self = this;
        if (!self.img) {
            self._callbuff = [cb];
            var img = self.img = new Image();
            img.onload = function () {
                self.img.loaded = true;
                self._callbuff.forEach(function (cb) {
                    cb(img);
                });
                self._callbuff.length = 0;
                delete self._callbuff;
            };
            img.src = this._url;
        }
        else if (!self.img.loaded) {
            this._callbuff.push(cb);
        } else {
            cb(this.img);
        }
    },
    createTile: function(coords,done){
        var self = this,
            zoom = coords.z - 9,
            size = this.getTileSize().x,
            x = coords.x % size,
            y = coords.y % size,
            max = size * Math.pow(2, zoom);

        var tile = L.DomUtil.create('canvas', 'leaflet-tile');
        tile.width = size*2;
        tile.height = size*2;
        self.downloadImage(function (img) {
            var _w = img.width,
                _h = img.height;

            var _s = Math.max(_w, _h) / max,
                _size = parseInt(size * _s),
                _x = parseInt(x * (size * _s)),
                _y = parseInt(y * (size * _s));

            if (_x < _w && _y < _h) {
                var f = self.scale;
                setTimeout(function () {
                    var ctx = tile.getContext('2d');
                    ctx.drawImage(img, _x*f, _y*f, _size*f, _size*f, 0, 0, tile.width, tile.height);
                    done(null, tile);
                },0);
            }
        });
        return tile;
    }
});
L.sheetLayer = function (url,options) {
    return new L.SheetLayer(url,options);
};