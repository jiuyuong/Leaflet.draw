var deps = {
	Core: {
		src: [
			'leaflet.js',
			'Leaflet.draw.js',
			'handler/PathDraggable.js'
		],
		desc: 'The core of the plugin. Currently only includes the version.'
	},

	Layer:{
		src:[
			'layer/SheetLayer.js',
			'layer/vector/Path.js',
			'layer/DragPath.js',
			'layer/vector/Line.js',
			'layer/vector/Arrow.js',
			'layer/vector/Task.js',
			'layer/vector/Pen.js',
			'layer/vector/Highlighter.js',
			'layer/vector/Cloud.js'
		],
		desc:'layer s',
		deps:['Core']
	},

	DrawHandlers: {
		src: [
			'draw/handler/Draw.Feature.js',
			'draw/handler/Draw.Features.js',
			'draw/handler/Draw.Polyline.js',
			'draw/handler/Draw.Polygon.js',
			'draw/handler/Draw.SimpleShape.js',
			'draw/handler/Draw.Rectangle.js',
			'draw/handler/Draw.Circle.js',
			'draw/handler/Draw.Marker.js',
			'draw/handler/Draw.Line.js',
			'draw/handler/Draw.Arrow.js',
			'draw/handler/Draw.Task.js',
			'draw/handler/Draw.Color.js',
			'draw/handler/Draw.Shapes.js',
			'draw/handler/Draw.Colors.js',
			'draw/handler/Draw.Tasks.js',
			'draw/handler/Draw.Pen.js',
			'draw/handler/Draw.Highlighter.js',
			'draw/handler/Draw.Cloud.js'
		],
		desc: 'Drawing handlers for: polylines, polygons, rectangles, circles and markers.',
		deps: ['Core']
	},

	EditHandlers: {
		src: [
			'edit/handler/Edit.Poly.js',
			'edit/handler/Edit.SimpleShape.js',
			'edit/handler/Edit.Rectangle.js',
			'edit/handler/Edit.Circle.js',
			'edit/handler/Edit.Line.js',
			'edit/handler/Edit.Arrow.js',
			'edit/handler/Edit.Task.js',
			'edit/handler/Edit.Pen.js',
			'edit/handler/Edit.Highlighter.js',
			'edit/handler/Edit.Cloud.js'
		],
		desc: 'Editing handlers for: polylines, polygons, rectangles, and circles.',
		deps: ['Core']
	},

	Extensions: {
		src: [
			'ext/LatLngUtil.js',
			'ext/GeometryUtil.js',
			'ext/LineUtil.Intersect.js',
			'ext/Polyline.Intersect.js',
			'ext/Polygon.Intersect.js'
		],
		desc: 'Extensions of leaflet classes.'
	},

	CommonUI: {
		src: [
			'Control.Draw.js',
			'Toolbar.js',
			'Tooltip.js'
		],
		desc: 'Common UI components used.',
		deps: ['Extensions']
	},

	DrawUI: {
		src: [
			'draw/DrawToolbar.js'
		],
		desc: 'Draw toolbar.',
		deps: ['DrawHandlers', 'CommonUI']
	},

	EditUI: {
		src: [
			'edit/EditToolbar.js',
			'edit/handler/EditToolbar.Edit.js',
			'edit/handler/EditToolbar.Delete.js'
		],
		desc: 'Edit toolbar.',
		deps: ['EditHandlers', 'CommonUI']
	},

	SXT:{
		src:[
			'sxt/SheetGroup.js',
			'sxt/Matters.js'
		],
		deps:['Core']
	}
};

if (typeof exports !== 'undefined') {
	exports.deps = deps;
}