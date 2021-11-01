// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 54.687, lng: 25.279},
        zoom: 13,
        mapId: '482a653f300f038d',
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false
    });
    initAutocomplete(map);

}

function initAutocomplete(map) {
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const geocoder = new google.maps.Geocoder();
    const searchBox = new google.maps.places.SearchBox(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }

            markers.push(
                new google.maps.Marker({
                    map,
                    title: place.name,
                    position: place.geometry.location,
                    draggable: true,
                    icon: 'static/images/marker_drop_off.png'
                })
            );

            geocodeAddress(geocoder, map, place, markers[0]);

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
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

function geocodeAddress(geocoder, resultsMap, place, marker) {
    const address = place.geometry.location.lat() + "," + place.geometry.location.lng()
    geocoder.geocode({address: address}, (results, status) => {
        if (status === "OK") {
            var location = results[0].geometry.location;
            //If marker was dragged
            if (localStorage.getItem("drop_location")!=null){
                location = new google.maps.LatLng(localStorage.getItem("drop_latitude"),
                    localStorage.getItem("drop_longtude"));
            }

            resultsMap.setCenter(location);

            //Inject human address in HTML
            var htmlAddress = document.getElementById('humanAddress');
            var humanAddress = results[0].formatted_address;

            //If marker was dragged
            if (localStorage.getItem("drop_location")!=null) {
                humanAddress = localStorage.getItem("drop_humanAddress");
            }
            //Save data to @localStorage
            localStorage.setItem("drop_latitude", marker.getPosition().lat());
            localStorage.setItem("drop_longtude", marker.getPosition().lng());
            localStorage.setItem("drop_humanAddress", humanAddress);
            console.log(localStorage);
            htmlAddress.innerHTML = humanAddress;

            //When moving marker, get the new coords from marker, decode and show on the page using @innerHTML
            google.maps.event.addListener(marker, "drag", function () {
                const address_after_moving = marker.getPosition().lat() + "," + marker.getPosition().lng();

                geocoder.geocode({address: address_after_moving}, (results_after_moving, status_after_moving) => {
                    if (status_after_moving === "OK") {
                        //If marker was dragged update @humanAddress in HTML and save new data to @localStorage
                        htmlAddress.innerHTML = results_after_moving[0].formatted_address;
                        localStorage.setItem("drop_latitude", marker.getPosition().lat());
                        localStorage.setItem("drop_longtude", marker.getPosition().lng());
                        localStorage.setItem("drop_humanAddress", results_after_moving[0].formatted_address);
                        localStorage.setItem("drop_locationLatLngObject)", address_after_moving);
                        console.log(localStorage);
                    }
                });

            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

