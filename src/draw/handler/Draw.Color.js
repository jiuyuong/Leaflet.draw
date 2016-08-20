L.Draw.Color = L.Handler.extend({
    includes: L.Mixin.Events,

    initialize: function (map, options) {
        this.color = options.color;
        this.type = options.type;
        L.setOptions(this, options);
    },

    enable: function () {
        if (this._enabled) { this.disable(); return; }

        this.fire('enabled', { handler: this.color });
        L.Handler.prototype.enable.call(this);
    },

    disable: function () {
        if (!this._enabled) { return; }

        L.Handler.prototype.disable.call(this);
        this.fire('disabled', { handler: this.type });
    },

    addHooks: function () {

    },

    removeHooks: function () {

    },

    setOptions: function (options) {
        L.setOptions(this, options);
    }
});