// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.


let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: Number(localStorage.getItem("lat")), lng: Number(localStorage.getItem("lng"))},
        zoom: 15,
        mapId: '482a653f300f038d',
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false
    });
   var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(localStorage.getItem("lat"),
            localStorage.getItem("lng")),
        icon: 'static/images/marker.png'
    });
   var latLngAdressObject = localStorage.getItem("lat") +
       ","
       + localStorage.getItem("lng");
    new google.maps.Geocoder().geocode({
        address: latLngAdressObject
    }, (results, status) => {
        if (status === "OK") {
            console.log(results[0].formatted_address)
            //Inject address to Html
            var htmlAddress = document.getElementById('humanAddress');
            var humanAddress = results[0].formatted_address;
            htmlAddress.innerHTML = humanAddress;

            //Update old data in @localStorage
            localStorage.setItem("latitude", marker.getPosition().lat());
            localStorage.setItem("longtude", marker.getPosition().lng());
            localStorage.setItem("humanAddress", results[0].formatted_address);
            localStorage.setItem("locationLatLngObject)", latLngAdressObject);
            console.log(localStorage);

            //Send POST request with Human Address body
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:8080/right_place', true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('coordinates', results[0].geometry.location);

            xhr.onload = function () {
                // do something to response
            };
            xhr.send(JSON.stringify(humanAddress));
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}
