/**
 * Created by jiuyuong on 2016/8/14.
 */
L.Path.mergeOptions({
    weight: 2,
    color: '#ff0000'
});
L.Path.include({
   _getCenterPart:function () {
       var c = this._latlng || this.getCenter();
       if(c) {
           return this._map.latLngToLayerPoint(c);
       }
   } 
});
L.SVG.include({
    _initPath: function (layer) {
        var path = layer._path = L.SVG.create('path');
        if(layer.options.text) {
            layer._text = L.SVG.create('text');
            layer._text.appendChild(document.createTextNode(""));
        }

        if (layer.options.className) {
            L.DomUtil.addClass(path, layer.options.className);
        }
        if (layer.options.interactive) {
            L.DomUtil.addClass(path, 'leaflet-interactive');
        }
        this._updateStyle(layer);
        this._updateTextStyle(layer);
    },
    _addPath: function (layer) {
        this._rootGroup.appendChild(layer._path);
        layer.addInteractiveTarget(layer._path);
        if(layer._text) {
            this._rootGroup.appendChild(layer._text);
            layer.addInteractiveTarget(layer._text);
        }
    },
    _removePath: function (layer) {
        L.DomUtil.remove(layer._path);
        layer.removeInteractiveTarget(layer._path);
        if(layer._text){
            L.DomUtil.remove(layer._text);
            layer.removeInteractiveTarget(layer._text);
        }
    },
    _updateTextStyle: function (layer) {
        if(layer._text) {
            layer.options["font-size"] && layer._text.setAttribute("font-size", layer.options["font-size"]);
            layer.options["font-family"] && layer._text.setAttribute("font-family", layer.options["font-family"]);
            layer._text.setAttribute("fill", layer.options.color);
            layer._text.setAttribute('stroke', layer.options.color);
            layer.options["font-style"] && layer._text.setAttribute("font-style", layer.options["font-style"]);
            layer.options["font-weight"] && layer._text.setAttribute("font-weight", layer.options["font-weight"]);
            layer._text.setAttribute("text-anchor", "middle");
            layer._text.setAttribute("dominant-baseline", "central");
            layer.options["text-decoration"] && layer._text.setAttribute("text-decoration", layer.options["text-decoration"]);
        }
    },
    _updateText: function (layer) {
        var e = layer._getCenterPart();
        if(e) {
            layer._text.setAttribute("x", e.x);
            layer._text.setAttribute("y", e.y);
            layer._text.textContent = layer.options.string || layer.options.text;
        }
    },
    _q:function (e, t, s, i) {
        return "Q" + [ e, t, s, i ].join(",");
    },

    _updateCloud: function (layer,bufSize) {
        if(!bufSize)
            bufSize = 15;

        var parts = layer._parts[0];
        if(!parts || parts.length!=4)
            return;
        var e,
            r,
            p = L.point(parts[1].x, parts[1].y),
            n = "M" + p.x + "," + p.y;

        for (e = parts[1].x; e <= parts[2].x; e += bufSize) {
            r = Math.min(bufSize,parts[2].x-e);
            p = p.add(L.point(r,0));
            n += this._q(p.x - r / 2, p.y - r, p.x, p.y);
        }
        for (e = parts[2].y; e <= parts[3].y; e += bufSize) {
            r = Math.min(bufSize,parts[3].y-e);
            p = p.add(L.point(0,r));
            n += this._q(p.x + r, p.y - r / 2, p.x, p.y);
        }
        for (e = parts[3].x; e >= parts[0].x; e-= bufSize) {
            r = Math.min(bufSize,e-parts[0].x);
            p = p.subtract(L.point(r,0));
            n += this._q(p.x + r / 2, p.y + r, p.x, p.y);
        }
        for (e = parts[0].y; e >= parts[1].y; e-= bufSize) {
            r = Math.min(bufSize,e-parts[1].y);
            p = p.subtract(L.point(0,r));
            n += this._q(p.x - r, p.y + r / 2, p.x, p.y);
        }
        n += "z";
        this._setPath(layer, n);
    }
});