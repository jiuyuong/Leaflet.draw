/**
 * Created by jiuyuong on 2016/8/14.
 */
L.Draw.Task = L.Draw.Feature.extend({
    statics: {
        TYPE: 'task'
    },

    options: {
        shapeOptions: {

        }
    },

    initialize: function (map, options) {
        // Save the type so super can fire, need to do this as cannot do this.TYPE :(
        this.type = L.Draw.Task.TYPE;

        L.Draw.Feature.prototype.initialize.call(this, map, options);
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
        var task = new L.Task(this._latlng, this.options.shapeOptions);
        L.Draw.Feature.prototype._fireCreatedEvent.call(this, task);
    }
});
