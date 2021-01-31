// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map;
// var marker;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 15,
        mapId: '482a653f300f038d',
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false
    });
    const geocoder = new google.maps.Geocoder();


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                geocodeAddress(geocoder, map, position.coords.latitude, position.coords.longitude);
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }


}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
    document.getElementById('lat').value = lat;
}

function geocodeAddress(geocoder, resultsMap, lang, lat) {
    const address = lang + "," + lat;
    // alert(lang + "," + lat);
    geocoder.geocode({address: address}, (results, status) => {
        if (status === "OK") {
            resultsMap.setCenter(results[0].geometry.location);
           var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                draggable:true,
                icon: 'static/images/marker.png',
            });
            google.maps.event.addListener(marker, "drag", function () {
                console.log(marker.getPosition().lat() + " " + marker.getPosition().lng())
            });
            // var htmlAddress = document.getElementById('humanAddress');
            // var humanAddress = results[0].formatted_address;
            // htmlAddress.innerHTML = humanAddress;
            // //    alert(results[0].formatted_address);
            // //Send POST request with Human Address body
            // var xhr = new XMLHttpRequest();
            // xhr.open('POST', 'http://localhost:8080/right_place', true);
            // xhr.setRequestHeader('Content-type', 'application/json');
            // xhr.setRequestHeader('coordinates', results[0].geometry.location)
            // xhr.onload = function () {
            //     // do something to response
            //     console.log(this.responseText);
            // };
            // xhr.send( JSON.stringify(humanAddress));
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

