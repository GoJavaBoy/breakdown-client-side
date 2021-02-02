var map, mapOptions, currentLocation, currentLocationMarker;
function loadMapScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "googleMaps"
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4aUoG-515_h5Mto9oGLZwCiPgtIFpPQU&map_ids=482a653f300f038d&callback=initMap&libraries=places&v=weekly"

    document.body.appendChild(script);
}

function initializeMap(mapOptions) {
    var myLatlng = new google.maps.LatLng(currentLocation.coords.latitude, currentLocation.coords.longitude);
    var mapOptions = {
        center : myLatlng,
        zoom : 18,
        mapTypeId : google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    updateCurrentLocationMarker();
}

function updateCurrentLocationMarker() {
    var myLatlng = new google.maps.LatLng(currentLocation.coords.latitude, currentLocation.coords.longitude);

    if (currentLocationMarker) {
        currentLocationMarker.setMap(null);
    } else {
        currentLocationMarker = new google.maps.Marker({
            position : myLatlng,
            animation : google.maps.Animation.DROP,
            title : "You!",
            map : map
        });
    }
}

function onSuccess(position) {
    currentLocation = position;
    if (!map) {
        loadMapScript();
    }
}

function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

document.addEventListener("deviceready", onDeviceReady, false);