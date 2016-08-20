L.Edit = L.Edit || {};

L.Edit.SimpleShape = L.Handler.extend({
	options: {
		moveIcon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-move'
		}),
		resizeIcon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-resize'
		})
	},

	initialize: function (shape, options) {
		this._shape = shape;
		L.Util.setOptions(this, options);
	},

	addHooks: function () {
		if (this._shape._map) {
			this._map = this._shape._map;

			if (!this._markerGroup) {
				this._initMarkers();
			}
			this._map.addLayer(this._markerGroup);

			this._shape.on('move',this.move,this);
			this._setEditStyle();
		}
	},
	move:function (e) {
		this._markerGroup && this._markerGroup.eachLayer(function (marker) {
			var oldPoint = marker._map.latLngToLayerPoint(marker.getLatLng());
			oldPoint._add(e.offset);
			var newLatLng = marker._map.layerPointToLatLng(oldPoint);
			marker.setLatLng(newLatLng);
		});
	},
	removeHooks: function () {
		this._resovleEditStyle();
		this._shape.off('move',this.move,this);
		if (this._shape._map) {

			this._moveMarker && this._unbindMarker(this._moveMarker);

			if(this._resizeMarkers) {
				for (var i = 0, l = this._resizeMarkers.length; i < l; i++) {
					this._unbindMarker(this._resizeMarkers[i]);
				}
				this._resizeMarkers = null;
			}
			if(this._markerGroup) {
				this._map.removeLayer(this._markerGroup);
				delete this._markerGroup;
			}
		}

		this._map = null;
	},

	_setEditStyle: function () {
		this._shape.orgOptions = {
			dashArray:this._shape.options.dashArray,
			fill:this._shape.options.fill,
			fillOpacity:this._shape.options.fillOpacity
		};
		this._shape.setStyle({
			dashArray:'5 6',
			fill:true,
			fillOpacity:0.2
		});
	},

	_resovleEditStyle: function () {
		this._shape.setStyle(this._shape.orgOptions);
		delete this._shape.orgOptions;
	},

	updateMarkers: function () {
		this._markerGroup.clearLayers();
		this._initMarkers();
	},

	_initMarkers: function () {
		if (!this._markerGroup) {
			this._markerGroup = new L.LayerGroup();
		}

		// Create center marker
		this._createMoveMarker();

		// Create edge marker
		this._createResizeMarker();
	},

	_createMoveMarker: function () {
		// Children override
	},

	_createResizeMarker: function () {
		// Children override
	},

	_createMarker: function (latlng, icon) {
		var marker = new L.Marker(latlng, {
			draggable: true,
			icon: icon,
			zIndexOffset: 10
		});

		this._bindMarker(marker);

		this._markerGroup.addLayer(marker);

		return marker;
	},

	_bindMarker: function (marker) {
		marker && marker
			.on('dragstart', this._onMarkerDragStart, this)
			.on('drag', this._onMarkerDrag, this)
			.on('dragend', this._onMarkerDragEnd, this);
	},

	_unbindMarker: function (marker) {
		marker && marker
			.off('dragstart', this._onMarkerDragStart, this)
			.off('drag', this._onMarkerDrag, this)
			.off('dragend', this._onMarkerDragEnd, this);
	},

	_onMarkerDragStart: function (e) {
		var marker = e.target;
		marker.setOpacity(0);

		this._shape.fire('editstart');
	},

	_fireEdit: function () {
		this._shape.edited = true;
		this._shape.fire('edit');
	},

	_onMarkerDrag: function (e) {
		var marker = e.target,
			latlng = marker.getLatLng();

		if (marker === this._moveMarker) {
			this._move(latlng);
		} else {
			this._resize(latlng);
		}

		this._shape.redraw();
	},

	_onMarkerDragEnd: function (e) {
		var marker = e.target;
		marker.setOpacity(1);

		this._fireEdit();
	},

	_move: function () {
		// Children override
	},

	_resize: function () {
		// Children override
	}
});
