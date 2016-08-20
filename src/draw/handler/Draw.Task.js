/**
 * Created by jiuyuong on 2016/8/14.
 */
L.Draw.Task = L.Draw.Feature.extend({
    statics: {
        TYPE: 'task'
    },

    initialize: function (map, options) {
        this.options = {
            shapeOptions:{
                fill:false
            }
        };
        this.type = L.Draw.Task.TYPE;
        L.Draw.Feature.prototype.initialize.call(this, map, options);
        this.options.shapeOptions.text = options.text;
    },

    addHooks: function () {
        L.Draw.Feature.prototype.addHooks.call(this);
        if (this._map) {
            this._map
                .on('click', this._onClick, this);
        }
    },

    removeHooks: function () {
        L.Draw.Feature.prototype.removeHooks.call(this);
        if(this._map) {
            this._map
                .off('click', this._onClick, this);
        }
    },

    _onClick: function (e) {
        this._latlng = e.latlng;
        this._fireCreatedEvent();

        this.disable();
        if (this.options.repeatMode) {
            this.enable();
        }
    },

    _fireCreatedEvent: function () {
        var task = new L.Task(this._latlng, L.extend({text:this.options.text},this.options.shapeOptions));
        L.Draw.Feature.prototype._fireCreatedEvent.call(this, task);
    }
});
