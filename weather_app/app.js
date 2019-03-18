$(document).ready(function() {
    var resumen = $('#resumen');
    var sensacion = $('#sensacion');
    var probabilidad = $('#probabilidad');
    var humedad = $('#humedad');
    var img_responsive = $('.img-responsive');
    var escondido = $('#escondido');
    var url = 'https://api.darksky.net/forecast/';
    var key = '7904ca6798c5fccd2358835e727861eb';
    var coords = {
        scl: '-33.4488897,-70.6692655',
        ccp: '-36.8201352,-73.0443904'
    };
    var queryParams = ['exclude=[minutely,hourly,daily,alerts,flags]', 'lang=es', 'units=auto'];
    var image = {
        'clear-day': 'img/sol.jpg',
        'rain': 'img/lluvia.jpg'
    }
    $("#select").on('change', function() {
        $.ajax({
            url: url + key + '/' + coords[$(this).val()] + '?' + queryParams[0] + '&' + queryParams[1] + '&' + queryParams[2],
            method: 'GET',
        }).then(function(data) {
            //console.log(data);
            resumen.text(parseInt(data.currently.temperature) + 'º ' + data.currently.summary);
            sensacion.text(parseInt(data.currently.apparentTemperature) + 'º');
            probabilidad.text(data.currently.precipProbability * 100 + ' %');
            humedad.text(data.currently.humidity * 100 + ' %');
            img_responsive.attr('src', image[data.currently.icon]);
            escondido.removeAttr('hidden');
        });
    });
})