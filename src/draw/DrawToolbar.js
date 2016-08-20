L.DrawToolbar = L.Toolbar.extend({

	options: {
		polyline: {},
		polygon: {},
		rectangle: {},
		circle: {},
		marker: {},
		line: {},
		arrow: {},
		pen:{},
		highlighter:{},
		cloud:{},
		shapes:true,
		tasks: [
			{
				text: 'SC',
				description:'\u5b9e\u6d4b\u503c'
			},{
				text: '\u95e8\u7a97',
				description:'\u7cbe\u88c5\u7c7b\u95e8\u7a97\u95ee\u9898'
			},{
				text: '\u95e8',
				description:'\u7cbe\u88c5\u7c7b\u95e8\u7a97\u95ee\u9898'
			},{
				text: '\u7a97',
				description:'\u7cbe\u88c5\u7c7b\u95e8\u7a97\u95ee\u9898\u7cbe\u88c5\u7c7b\u95e8\u7a97\u95ee\u9898'
			},{
				text: '\u7cbe',
				description:'\u7cbe\u88c5\u7c7b\u95e8\u7a97\u95ee\u9898'
			}
		],
		colors:[
			{
				type:'red',
				color:'#e82100',
				tile:'Red'
			},{
				type:'green',
				color:'#03e900',
				tile:'Green'
			},{
				type:'yellow',
				color:'#eeeb00',
				tile:'Yellow'
			},{
				type:'black',
				color:'#000000',
				tile:'Black'
			},{
				type:'cyan',
				color:'#2de9ea',
				tile:'cyan'
			},{
				type:'pink',
				color:'#f33db2',
				tile:'Pink'
			},{
				type:'orange',
				color:'#f27d02',
				tile:'Orange'
			},{
				type:'blue',
				color:'#1459f1',
				tile:'Blue'
			}
		]
	},

	initialize: function (options) {
		// Ensure that the options are merged correctly since L.extend is only shallow
		for (var type in this.options) {
			if (this.options.hasOwnProperty(type)) {
				if (options[type]) {
					options[type] = L.extend({}, this.options[type], options[type]);
				}
			}
		}

		this._toolbarClass = 'leaflet-draw-draw';
		L.Toolbar.prototype.initialize.call(this, options);
		this.colorType = 'red';
	},

	getModeHandlers: function (map) {
		return [
			{
				enabled: this.options.cloud,
				handler: new L.Draw.Cloud(map, this.options.cloud),
				title: L.drawLocal.draw.toolbar.buttons.polyline
			},
			{
				enabled: this.options.tasks,
				handler: new L.Draw.Tasks(map, this.options.tasks),
				title: L.drawLocal.draw.toolbar.buttons.line
			},
			{
				enabled: this.options.pen,
				handler: new L.Draw.Pen(map, this.options.pen),
				title: L.drawLocal.draw.toolbar.buttons.polyline
			},
			{
				enabled: this.options.highlighter,
				handler: new L.Draw.Highlighter(map, this.options.highlighter),
				title: L.drawLocal.draw.toolbar.buttons.polyline
			},
			{
				enabled: this.options.shapes,
				handler: new L.Draw.Shapes(map,this.options),
				title: L.drawLocal.draw.toolbar.buttons.polyline
			},
			{
				enabled: this.options.arrow,
				handler: new L.Draw.Arrow(map, this.options.line),
				title: L.drawLocal.draw.toolbar.buttons.line
			},
			{
				enabled: this.options.colors,
				handler: new L.Draw.Colors(map, this, this.options.colors),
				title: L.drawLocal.draw.toolbar.buttons.line,
				text :'<span></span>'
			}
		];
	},

	// Get the actions part of the toolbar
	getActions: function (handler) {

		return ((handler.getActions &&
			handler.getActions()) || [])
			/*.concat([
			{
				className:'action_operate',
				enabled: handler.deleteLastVertex,
				title: L.drawLocal.draw.toolbar.undo.title,
				callback: handler.deleteLastVertex,
				context: handler
			},
			{
				className:'action_cancel',
				title: L.drawLocal.draw.toolbar.actions.title,
				callback: this.disable,
				context: this
			}
		]);*/
	},

	setOptions: function (options) {
		L.setOptions(this, options);

		for (var type in this._modes) {
			//if (this._modes.hasOwnProperty(type) && options.hasOwnProperty(type)) {
				this._modes[type].handler.setOptions(options);
			//}
		}
	}
});
