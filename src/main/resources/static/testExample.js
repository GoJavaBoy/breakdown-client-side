// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

var map;
// var marker;
var laturl;
var lngurl;
var baseurl = "http://augmenting.me/geo/report/?coordinates=";
var linkurl;
var comma = ", ";

//set map variables
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 15,
        mapId: '482a653f300f038d',
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false
    });

    // Try HTML5 geolocation to get location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);

            var marker = new google.maps.Marker({
                map: map,
                position: pos,
                title: 'We are watching you.',
                draggable: true,
                icon: 'static/images/marker.png'
            });

            google.maps.event.addListener(marker, "drag", function () {
                console.log(marker.getPosition().lat() + " " + marker.getPosition().lng())
            });

            map.setCenter(pos);
        }, function () {
            handleNoGeolocation(true);
        });
    }

}

