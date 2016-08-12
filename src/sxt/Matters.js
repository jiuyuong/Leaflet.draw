/**
 * Created by jiuyuong on 2016/8/11.
 */
L.Matters = L.Evented.extend({
    options:{
        map:{
            options:{
                center: new L.LatLng(-37.7772, 175.2756),
                zoom: 15,
                attributionControl:false
            }
        },
        draw:{
            options: {
                position: 'topright',
                draw:{
                    edit:true
                }
            }
        }
    },
    initialize:function (options) {
        var self = this;
        self.options.map.options.layers = [L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: false})];
        var map,mapOptions = L.setOptions(self.options.map, options.map);
        map = self._map = new L.Map(options.map.el, mapOptions);
        var sheetGroup = self.sheet = L.sheetGroup();
        map.addLayer(sheetGroup);

        var drawControl = new L.Control.Draw(L.setOptions(this.options.draw,options.draw));
        map.addControl(drawControl);

        map.on('draw:created', function (e) {
            var type = e.layerType,
                layer = e.layer;
            sheetGroup.addLayer(layer);
        });
        map.on('click',self._click,self);
    },
    _click:function (e) {
        var self = this;
        if(!self._map)return;
        var p = e.latlng,// this._map.mouseEventToLatLng(e),
            overLayers = [];

        this.sheet.eachLayer(function (layer) {
            if(layer.editing && layer.editing._enabled)
                eb = layer;
            var bounds = layer.getBounds();
            if(bounds && self.isMiddleNumber(bounds._southWest.lat, bounds._northEast.lat, p.lat, 0) &&
                self.isMiddleNumber(bounds._southWest.lng, bounds._northEast.lng, p.lng, 0)
            ){
                overLayers.push(layer);
            }
        });
        if(overLayers.length == 1){
            this._fireEditLayer(overLayers[0]);
        }
        else if(overLayers.length>1){
            var st = overLayers.filter(function (l) {
                return l instanceof L.Stamp;
            }),gp = overLayers.filter(function (l) {
                return l instanceof L.AreaGroup;
            });
            if(st.length && gp.length){
                gp.forEach(function (p) {
                    var ix = overLayers.indexOf(p);
                    overLayers.splice(ix,1);
                });
                if(overLayers.length==1){
                    this._fireEditLayer(overLayers[0]);
                    return;
                }
            }
            var toolbar = L.DomUtil.create('div','leaflet-draw-subbuttom'),
                ul = L.DomUtil.create('ul','',toolbar);
            overLayers.forEach(function(layer){
                var li =  L.DomUtil.create('li','',ul),
                    a = L.DomUtil.create('a','',li);
                a.setAttribute('href','javascript:void(0)');
                if(layer instanceof L.Stamp) {
                    a.innerHTML = '\u70b9'+(layer.getValue() && layer.getValue().seq);
                }
                else if(layer instanceof L.LineGroup){
                    a.innerHTML = '\u6d4b\u91cf\u7ec4';
                }
                else if(layer instanceof L.AreaGroup){
                    a.innerHTML = '\u533a\u57df\u7ec4';
                }
                L.DomEvent.on(a,'click',function(e){
                    self._map.closePopup();
                    self._fireEditLayer(layer);
                })
            });
            self._map.openPopup(toolbar,p,{
                closeButton:false
            });
        }
        else{
            self._fireEditLayer();
        }
    },
    _fireEditLayer:function (layer) {
        var self = this;
        if(self.editingLayer){
            if(self.editingLayer!==layer){
                self.editingLayer.cancelEdit();
                self.editingLayer = null;
            }
            return;
        }
        self.editingLayer = layer;
        layer && layer.edit();
    },
    isMiddleNumber:function(n1,n2,n, f) {
        if(f){ //修正线难被点到的问题
            if(Math.abs(n1-n2)<0.02){
                if(n1>n2)
                {
                    n1+=0.01;
                    n2-=0.01;
                }
                else{
                    n1-=0.01;
                    n2+=0.01;
                }
            }
        }
        return n1 > n2 ?
        n1 >= n && n >= n2 :
        n2 >= n && n >= n1;
    },
    uuid:function(){
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function"){
            d += performance.now();
        }
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
});

L.matters = function (options) {
    return new L.Matters(options);
}

L.Path.mergeOptions({
    weight: 1,
    color: '#ff0000',
})