/**
 * Created by jiuyuong on 2016/8/12.
 */
L.DragPath = L.Path.extend({
    impostorOptions:{
        stroke:"#ff0000",
        "stroke-linejoin":"round",
        "stroke-linecap":"round",
        "stroke-opacity":0,
        "stroke-width":2,
        fill:"none"
    },
    _initEvents:function() {
        L.Path.prototype._initEvents.call(this);
        if (this.options.clickable) {
            L.DomEvent.on(this._container, "click", this._onMouseClick, this);
            var events = [ "dblclick", "mousedown", "mouseover", "mouseout", "mousemove", "contextmenu" ];
            for (var i = 0; i < events.length; i++)
                L.DomEvent.on(this._container, events[i], this._fireMouseEvent, this);
        }
    }
});