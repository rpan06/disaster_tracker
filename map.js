let map;

var circles = {
	Volcano: { color: ' #ff0000' },
	WildFire: { color: '#ff6600' },
	Fire: { color: ' #ff6600' },
	HeatWave: { color: ' #ff6600' },
	Drought: { color: '#996633' },
	Earthquake: { color: '#996633' },
	LandSlide: { color: '#996633' },
	MudSlide: { color: '#996633' },
	Epidemic: { color: '#e6e600' },
	InsectInfestation: { color: '#5cd65c' },
	SnowAvalanche: { color: '#afd5ff' },
	ColdWave: { color: '#99ccff' },
	Flood: { color: '#0066cc' },
	FlashFlood: { color: '#0059b3' },
	Tsunami: { color: '#0059b3' },
	TropicalCyclone: { color: '#737373' },
	StormSurge: { color: '#737373' },
	SevereLocalStorm: { color: '#737373' },
	ExtratropicalCyclone: { color: '#737373' },
	TechnologicalDisaster: { color: ' #000000' },
	Other: { color: '#000000' },
};

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	zoom: 2,
	mapTypeId: 'roadmap',
	center: {lat: 13.4443, lng: 144.7937}
	});

	initMapLegend();
}

function initMapLegend() {
	let legend = $('#map_legend');

	for(var key in circles){
		if(key==='Other')
			break;
		
		let elementDiv = $('<div>', { id: 'elementDiv' });
		let elementCir = $('<div>', { id: 'elementCir', class: 'circle' }).css('background-color', circles[key].color);
		let elementName = $('<span>', { id: 'elementName', text: key, color: circles[key].color });
		elementDiv.append(elementCir, elementName);
		legend.append(elementDiv);
	}
}

function placeMarkers(array) {
	for (let i = 0; i < array.length; i++) {
		const item = array[i];
		let latLng = new google.maps.LatLng(item.location.lat,item.location.lon);
		let infowindow = new google.maps.InfoWindow({
		  content: '<div id="content">'+
		  '<div id="siteNotice">'+
		  '</div>'+
		  `<h2 id="firstHeading" class="firstHeading">${item.title}</h2>`+
		  '<div id="bodyContent">'+
		  `<p>${item.body} <a href=${item.url}>read more</a></p>`+
		  '</div>'+
		  '</div>'
		});
		let circle = new google.maps.Circle({
	        strokeColor: circles[item.disasterType],
	        strokeOpacity: 0.8,
	        strokeWeight: 0,
	        fillColor: circles[(item.disasterType).replace(/ /g,'')].color,
	        fillOpacity: 0.6,
	        center: latLng,
	        clickable: true,
	        draggable: false,
	        map: map,
	        radius: (60 * 15000),
	        data: { Title: item.title }
    	});
		google.maps.event.addListener(circle, 'click', function(ev){
			infowindow.setPosition(circle.getCenter());
			infowindow.open(map);
			requestNewsData(item.keywords);
      		searchTwitter(item.keywords);
		});
	}
}
