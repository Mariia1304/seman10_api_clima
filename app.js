var ciudades = {
    scl: {
        lat: -33.456,
        lng: -70.648
    },
    ccp: {
        lat: -36.820,
        lng: -73.044
    }
};
var map, marker;
// Initialize and add the map
function initMap() {
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: ciudades.scl.lat,
            lng: ciudades.scl.lng
        },
        zoom: 8
    });
    // Create a marker and set its position.
    marker = new google.maps.Marker({
        position: ciudades.scl,
        map: map
    });
};

function setMap(ciudad) {
    var cors = 'https://cors-anywhere.herokuapp.com/';
    var api_key = '7904ca6798c5fccd2358835e727861eb';
    var queryParams = ['exclude=[minutely,hourly,daily,alerts,flags]', 'lang=es', 'units=auto'];
    var resumen = $('#resumen');
    $.ajax({
        url: cors + 'https://api.darksky.net/forecast/' + api_key + '/' + ciudad.lat + ',' + ciudad.lng + '?' + queryParams[0] + '&' + queryParams[1] + '&' + queryParams[2],
        method: 'GET'
    }).then(function(data) {
        console.log(data);
        map = new google.maps.Map(document.getElementById('map'), {
            center: ciudad,
            zoom: 8
        });
        marker = new google.maps.Marker({
            position: ciudad,
            map: map
        });
        resumen.text(data.currently.temperature + 'º ' + data.currently.summary)
    });
};
$(function() {
    $('#select').on('change', function(event) {
        setMap(ciudades[$(this).val()])
    });
});