L.Draw.Colors = L.Draw.Features.extend({
    statics: {
        TYPE: 'colors'
    },

    initialize: function (map, toolbar, colors) {
        this.map = map;
        var _options = {
            actions: []
        },color;
        for(var k in colors) {
            var color = colors[k];
            _options.actions.push({
                enabled: color,
                feature: L.Draw.Color
            });
        }
        L.Draw.Features.prototype.initialize.call(this,map,_options);
        this.type = L.Draw.Colors.TYPE;
        this.toolbar = toolbar;
        this.curColorType = toolbar.colorType;
    },

    _actionEnabled:function () {
        L.Draw.Features.prototype._actionEnabled.call(this);
        if(this.curColorType){
            L.DomUtil.removeClass(this.linkButton,'cur-'+ this.curColorType);
        }
        this.curColorType = this.action.handler.type;
        L.DomUtil.addClass(this.linkButton,'cur-'+this.action.handler.type);
        this.setColor();
        this.action.handler.disable();
    },

    addButton: function (linkButton) {
        L.Draw.Features.prototype.addButton.call(this,linkButton);
        L.DomUtil.addClass(this.linkButton,'cur-'+this.curColorType);
    },
    setColor:function () {
        var colorOptions = {shapeOptions:{color:this.action.enabled.color}};
        if(this.map){
            this.map.eachLayer(function (layer) {
                if(layer.editing && layer.editing._enabled){
                    layer.setStyle(colorOptions.shapeOptions);
                }
            })
        }
        this.toolbar.setOptions(colorOptions);
    }
});