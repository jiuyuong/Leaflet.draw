L.Draw.Features = L.Handler.extend({
    statics: {
        TYPE: 'features'
    },

    includes: L.Mixin.Events,

    options:{
        actions:[
        ]
    },

    initialize: function (map, options) {
        var self = this;
        self._map = map;
        self.type = options.defaultType || L.Draw.Features.TYPE;
        L.setOptions(self, options);
        self.options.actions.forEach(function (action) {
            if(!action.enabled)
                return;

            if(!action.handler && action.feature)
                action.handler = new action.feature(map,action.enabled);

        });
    },

    enable: function () {
        if(this.action){
            this.action.handler.enable();
            return;
        }
        if (this._enabled) { this.disable(); return; }
        this.fire('enabled', { handler: this.type });
        L.Handler.prototype.enable.call(this);
    },

    disable: function () {
        if (!this._enabled) {
            if (this.action) {
                this.action.handler.disable();
                return;
            }
            return;
        }
        L.Handler.prototype.disable.call(this);
        this.fire('disabled', { handler: this.type });
    },

    addHooks: function () {
        var map = this._map;

        if (map) {

        }
    },

    removeHooks: function () {
        if (this._map) {

        }
    },

    setOptions: function (options) {
        //L.setOptions(this, options);
        this.options.actions.forEach(function (action) {
            action.handler.setOptions(options);
        });
    },

    getActions: function () {
        if(this.action) return null;
        var actions = [], self = this;
        this.options.actions.forEach(function (action) {
            if(!action.enabled)
                return;

            actions.push({
                title: action.title,
                className: 'action_'+action.handler.type,
                text: action.text,
                description: action.description,
                context: self,
                callback: function () {
                    self.actionCallback(action);
                }
            })
        });
        return actions;
    },


    actionCallback: function (action) {
        this.action = action;
        action.handler.enable();
        this._actionEnabled();
    },

    _actionEnabled:function () {
        this.fire('enabled', { handler: this.type });
        L.DomUtil.addClass(this.linkButton,'on-' + this.action.handler.type);
        if(this.action.handler.options.text){
            this.linkButton.innerHTML = this.action.handler.options.text;
        }
        this.action.handler.on('disabled', this._actionDisable, this)
    },

    _actionDisable:function () {
        this.action.handler.off('disabled', this._actionDisable, this);
        this.fire('disabled', { handler: this.type });
        L.DomUtil.removeClass(this.linkButton,'on-' + this.action.handler.type);
        if(this.action.handler.options.text){
            this.linkButton.innerHTML = '';
        }
        this.action = null;
    },

    addButton: function (linkButton) {
        this.linkButton = linkButton;
    }
});