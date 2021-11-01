// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map;

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

function geocodeAddress(geocoder, resultsMap, lat, lang) {
    const address = lat + "," + lang;
    geocoder.geocode({address: address}, (results, status) => {
        if (status === "OK") {
            var location = results[0].geometry.location;
            //If marker was dragged
            if (localStorage.getItem("location")!=null){
                location = new google.maps.LatLng(localStorage.getItem("latitude"),
                    localStorage.getItem("longtude"));
            }

            resultsMap.setCenter(location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: location,
                draggable: true,
                icon: 'static/images/marker.png'
            });

            //Inject human address in HTML
            var htmlAddress = document.getElementById('humanAddress');
            var humanAddress = results[0].formatted_address;

            //If marker was dragged
            if (localStorage.getItem("location")!=null) {
                humanAddress = localStorage.getItem("humanAddress");
            }
            //Save data to @localStorage
            localStorage.setItem("latitude", marker.getPosition().lat());
            localStorage.setItem("longtude", marker.getPosition().lng());
            localStorage.setItem("humanAddress", humanAddress);
            console.log(localStorage);
            htmlAddress.innerHTML = humanAddress;

            //When moving marker, get the new coords from marker, decode and show on the page using @innerHTML
            google.maps.event.addListener(marker, "drag", function () {
                const address_after_moving = marker.getPosition().lat() + "," + marker.getPosition().lng();

                geocoder.geocode({address: address_after_moving}, (results_after_moving, status_after_moving) => {
                    if (status_after_moving === "OK") {
                        //If marker was dragged update @humanAddress in HTML and save new data to @localStorage
                        htmlAddress.innerHTML = results_after_moving[0].formatted_address;
                        localStorage.setItem("latitude", marker.getPosition().lat());
                        localStorage.setItem("longtude", marker.getPosition().lng());
                        localStorage.setItem("humanAddress", results_after_moving[0].formatted_address);
                        localStorage.setItem("locationLatLngObject)", address_after_moving);
                        console.log(localStorage);
                    }
                });

            });
            //Send POST request with Human Address body
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:8080/right_place', true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('coordinates', results[0].geometry.location)
            xhr.onload = function () {
                // do something to response
            };
            xhr.send(JSON.stringify(humanAddress));
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

