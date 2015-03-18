// Une fois la fenêtre du navigateur chargée, initialise PhoneGap
window.addEventListener('load', function () {
    document.addEventListener('deviceready', onDeviceReady, false);
}, false);

// Cette méthode est appelée une fois que PhoneGap est chargé
function onDeviceReady(){
	var btnGetPosition = $('#btnGetPosition');
	btnGetPosition.click(function(){
		navigator.geolocation.getCurrentPosition (onGetCurrentPositionSuccess, onGetCurrentPositionError, {enableHighAccuracy: true, timeout: 5000});
	});
}

function onGetCurrentPositionSuccess (position) {
	var html = '';
	if(position.coords.latitude)
		html = html + 'Latitude: ' + position.coords.latitude + '<br>';
	if(position.coords.longitude)
		html = html + 'Longitude: ' + position.coords.longitude + '<br>';
	if(position.coords.altitude)
		html = html + 'Altitude: ' + position.coords.altitude + '<br>';
	if(position.coords.accuracy)
		html = html + 'Accuracy: ' + position.coords.accuracy + '<br>';
	if(position.coords.altitudeAccuracy)
		html = html + 'Altitude accuracy: ' + position.coords.altitudeAccuracy + '<br>';
	if(position.coords.heading)
		html = html + 'Heading: ' + position.coords.heading + '<br>';
	if(position.coords.speed)
		html = html + 'Speed: ' + position.coords.speed + '<br>';
	if(position.coords.timestamp)
		html = html + 'Timestamp: ' + new Date(position.timestamp) + '<br>';
	$('#geolocation').html(html);
	$('#map_canvas').gmap ({
		'center': position.coords.latitude + ',' + position.coords.longitude,
		'disableDefaultUI': true,
		'zoom': 12,
		'callback': function() {
			var self = this;
			var marker = self.addMarker ({'position': this.get('map').getCenter()});
			marker.click (function() {
				self.openInfoWindow ({'content': 'Votre position'}, this);
			});
		}	
	});
}

function onGetCurrentPositionError (error) {
	navigator.notification.alert ('Erreur: ' + error.message);
}
