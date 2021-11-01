// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


function initAutocomplete() {
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    var options = {
        componentRestrictions: {country: 'lt'}
    };
    const autocomplete = new google.maps.places.Autocomplete(input, options);

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);

    function onPlaceChanged() {
        const place = autocomplete.getPlace();
        latLng = place.geometry.location;
        localStorage.setItem("lat", latLng.lat());
        localStorage.setItem("lng", latLng.lng());
    }
}