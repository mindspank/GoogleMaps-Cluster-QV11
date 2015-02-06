//Google Maps APIv3 with MarkerCluster v2.0.1
//Created by Alexander Karlsson - akl@qlikview.com - QlikTech Nordic AB
//Tested on QV11
//
//QlikTech takes no responsbility for any code.
//Use at your own risk.
//Do not submerge in water.
//Do not taunt Happy Fun Ball.

function map_init() {

	Qva.AddExtension('GoogleMaps - Cluster', function() {

		var _this = this;
		var divName = _this.Layout.ObjectId.replace("\\", "_");
		var popupLabels = _this.Layout.Text0.text;
		var gSize = _this.Layout.Text1.text;
		var mZoom = _this.Layout.Text2.text;
		var disableStyles = _this.Layout.Text3.text;
		var markers = [];
		var infoList = [];
		var latlngbounds = new google.maps.LatLngBounds();

		var styles = [{
			"featureType": "landscape",
			"stylers": [{
				"saturation": -100
			}, {
				"lightness": 65
			}, {
				"visibility": "on"
			}]
		}, {
			"featureType": "poi",
			"stylers": [{
				"saturation": -100
			}, {
				"lightness": 51
			}, {
				"visibility": "simplified"
			}]
		}, {
			"featureType": "road.highway",
			"stylers": [{
				"saturation": -100
			}, {
				"visibility": "simplified"
			}]
		}, {
			"featureType": "road.arterial",
			"stylers": [{
				"saturation": -100
			}, {
				"lightness": 30
			}, {
				"visibility": "on"
			}]
		}, {
			"featureType": "road.local",
			"stylers": [{
				"saturation": -100
			}, {
				"lightness": 40
			}, {
				"visibility": "on"
			}]
		}, {
			"featureType": "transit",
			"stylers": [{
				"saturation": -100
			}, {
				"visibility": "simplified"
			}]
		}, {
			"featureType": "administrative.province",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "water",
			"elementType": "labels",
			"stylers": [{
				"visibility": "on"
			}, {
				"lightness": -25
			}, {
				"saturation": -100
			}]
		}, {
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [{
				"hue": "#ffff00"
			}, {
				"lightness": -25
			}, {
				"saturation": -97
			}]
		}]

		if (this.Element.children.length === 0) {
			var ui = document.createElement("div");
			ui.setAttribute("id", divName);
			this.Element.appendChild(ui);
			$("#" + divName).css("height", _this.GetHeight() + "px").css("width", _this.GetWidth() + "px");
		} else {
			$("#" + divName).css("height", _this.GetHeight() + "px").css("width", _this.GetWidth() + "px");
			$("#" + divName).empty();
		};


		var styledMap = new google.maps.StyledMapType(styles, {
			name: "Grayscale"
		});
		var mapOptions = {
			panControl: true,
			zoomControl: true,
			overviewMapControl: false,
			overviewMapControlOptions: {
				opened: false
			},
			scaleControl: false,
			streetViewControl: true,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		};
		var map = new google.maps.Map(document.getElementById(divName), mapOptions);

		map.mapTypes.set('map_style', styledMap);

		var reg = /\.(gif|jpg|jpeg|tiff|png|bmp)$/;
		var rowreg = _this.Data.Rows[0];

		if (reg.test(rowreg[4].text)) {
			for (var i = 0, k = _this.Data.Rows.length; i < k; i++) {
				var row = _this.Data.Rows[i];
				var val = parseFloat(row[0].text);
				var val2 = parseFloat(row[1].text);
				if (val != NaN && val != '' && val <= 90 && val >= -90 && val2 != NaN && val2 != '' && val2 <= 180 && val >= -180) {
					var latLng = new google.maps.LatLng(val, val2);
					var marker = new google.maps.Marker({
						position: latLng,
						title: '',
						icon: row[4].text,
						customData: row[2].text
					});

					if (popupLabels === 1) {

						marker.infoWindow = new google.maps.InfoWindow({
							content: row[3].text
						});

						google.maps.event.addListener(marker, 'mouseover', function() {
							infoList.push(this);
							this.infoWindow.open(map, this);
						});

						google.maps.event.addListener(marker, 'mouseout', function() {
							infoList.push(this);
							this.infoWindow.close();
						});
					};

					google.maps.event.addListener(marker, 'click', (function(lat, lng) {
						return function() {
							_this.Data.SearchColumn(0, lat, false);
							_this.Data.SearchColumn(1, lng, true)
						}
					})(val, val2));
					latlngbounds.extend(latLng);
					markers.push(marker);
				}
			};
		} else {

			for (var i = 0, k = _this.Data.Rows.length; i < k; i++) {
				var row = _this.Data.Rows[i];
				var val = parseFloat(row[0].text);
				var val2 = parseFloat(row[1].text);
				if (val != NaN && val != '' && val <= 90 && val >= -90 && val2 != NaN && val2 != '' && val2 <= 180 && val >= -180) {
					var latLng = new google.maps.LatLng(val, val2);
					var marker = new google.maps.Marker({
						position: latLng,
						title: '',
						customData: row[2].text
					});

					if (popupLabels === 1) {

						marker.infoWindow = new google.maps.InfoWindow({
							content: row[3].text
						});

						google.maps.event.addListener(marker, 'mouseover', function() {
							infoList.push(this);
							this.infoWindow.open(map, this);
						});

						google.maps.event.addListener(marker, 'mouseout', function() {
							infoList.push(this);
							this.infoWindow.close();
						});
					};
				}
				google.maps.event.addListener(marker, 'click', (function(lat, lng) {
					return function() {
						_this.Data.SearchColumn(0, lat, false);
						_this.Data.SearchColumn(1, lng, true)
					}
				})(val, val2));
				latlngbounds.extend(latLng);
				markers.push(marker);
			};
		}

		//map.setCenter(latlngbounds.getCenter());
		map.fitBounds(latlngbounds);
		if(disableStyles) {
			var clusterStyles = [{
				opt_textColor: 'black',
				url: Qva.Remote + '?public=only&name=Extensions/' + encodeURIComponent('GoogleMaps - Cluster') + '/singlecluster.png',
				height: 56,
				width: 55
			}];
		};

		var mcOptions = {
			gridSize: gSize,
			styles: clusterStyles,
			maxZoom: mZoom
		};

		var markerCluster = new MarkerClusterer(map, markers, mcOptions);
		markerCluster.setCalculator(function(markers, clusterStyles) {

			var index = 0,
				count = markers.length,
				total = count;

			while (total !== 0) {
				//Create a new total by dividing by a set number
				total = parseInt(total / 5, 10);
				//Increase the index and move up to the next style
				index++;
			}
			index = Math.min(index, clusterStyles);

			var measure = 0;
			for (var i = 0, k = count; i < k; i++) {
				measure += parseInt(markers[i].customData)
			}
			var abbreviatedValue = abbreviateNumber(measure)
			return {
				text: abbreviatedValue,
				index: index
			};
		});

	});
};

/* load external libs - callback map_init() */
loadLibs();

function loadLibs() {
	Qva.LoadScript('/QvAjaxZfc/QvsViewClient.aspx?public=only&name=Extensions/GoogleMaps - Cluster/markerclusterer.js', function() {
		Qva.LoadScript('https://maps.google.com/maps/api/js?sensor=false&callback=map_init')
	});
};

function abbreviateNumber(value) {
	var newValue = value;
	if (value >= 1000) {
		var suffixes = ["", "k", "m", "b", "t"];
		var suffixNum = Math.floor(("" + value).length / 3);
		var shortValue = '';
		for (var precision = 2; precision >= 1; precision--) {
			shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
			var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
			if (dotLessShortValue.length <= 2) {
				break;
			}
		}
		if (shortValue % 1 != 0) shortNum = shortValue.toFixed(1);
		newValue = shortValue + suffixes[suffixNum];
	}
	return newValue;
};