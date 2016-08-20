L.Draw.Shapes = L.Draw.Features.extend({
    statics: {
        TYPE: 'shapes'
    },
    initialize: function (map, options) {
        var _options = {
            actions: [
                {
                    enabled: options.line,
                    feature: L.Draw.Line,
                    title: L.drawLocal.draw.toolbar.buttons.line
                },
/*                {
                 enabled: options.polygon,
                 feature: L.Draw.Polygon,
                 title: L.drawLocal.draw.toolbar.buttons.polygon
                 },*/
                {
                    enabled: options.rectangle,
                    feature: L.Draw.Rectangle,
                    title: L.drawLocal.draw.toolbar.buttons.rectangle
                },
                {
                    enabled: options.circle,
                    feature: L.Draw.Circle,
                    title: L.drawLocal.draw.toolbar.buttons.circle
                }
            ]
        };
        L.Draw.Features.prototype.initialize.call(this,map,_options);
        this.type = L.Draw.Shapes.TYPE;
    }
})